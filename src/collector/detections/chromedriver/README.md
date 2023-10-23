# Detect the presence of Chromedriver

To automate Chrome (or any Chromium based browser) with Selenium, you need to
use Chromedriver as an intermediary.

But using Chromedriver adds some additional Javascript which makes it easier to
detect this automation.

You can find the related scripts here:
https://github.com/chromium/chromium/tree/main/chrome/test/chromedriver/js

There are two interesting things that are usually looked at by other bot
detection systems:

1. It adds 3 objects to the global ``window`` object:
 * ``cdc_adoQpoasnfa76pfcZLmcfl_Array``
 * ``cdc_adoQpoasnfa76pfcZLmcfl_Promise``
 * ``cdc_adoQpoasnfa76pfcZLmcfl_Symbol``
2. If you called some selenium functions that interact with the page, 
  chromedriver will add ``$cdc_adoQpoasnfa76pfcZLmcfl_`` to the ``document``
  object

They have this weird prefix so they never overwrite any real property.

Now on the other side since this is quite a well-known issue, stealth bot
systems will change these object names. But for whatever reason they keep the
same structure, 3 random characters, then an underscore, then 22 more random
characters, then another underscore. It's quite trivial why this isn't a good
evasion method, you can easily write up a regex that matches this pattern.

Also just for a quick detour, they usually change it by patching the official
chromedriver binary. Otherwise they would need to recompile it every time. So
that's one explanation why they are keeping the format: they cannot change the
string's length otherwise your binary would not work. But javascript is not
sensitive to unnecessary spaces, so you could simply overwrite the excessive
characters with spaces. So technically they don't need to follow any pattern to
have a correctly working chromedriver binary. Also, if you actually look at the
code where the ``window`` objects extra properties are used you would see lines
like this:

``const Promise = window.cdc_adoQpoasnfa76pfcZLmcfl_Promise || window.Promise;``

So even if you completely remove these properties (patch them out with spaces),
you would have a fully working chromedriver binary. Furthermore these properties
are just references to the browser's original ``Array``, ``Promise`` and
``Symbol`` functions.

The detection method in this library uses this approach. It checks if there are
is an additional reference to the ``window.Array``, ``window.Promise`` and
``window.Symbol`` functions on the global ``window`` object.

It also checks if there's a property on the ``document`` object which matches
the signature of the one that chromedriver inserts (as it is quite unique).

This way we are completely independent from the naming of these properties.

Note that this method can still be bypassed pretty easily if you patch out these
residual properties fully from the binary.
