# Detect the presence of a fake ``document.createElement`` method

This is an inconsistency primarily found in
https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth

It alters the ``document.createElement`` method to intercept when a script is
creating an iframe element.

But it does so inconsistently. The ``createElement`` method should be inherited
from the prototype under normal circumstances.

I.e. ``Document.prototype.createElement === document.createElement`` should be
true. This is not the case in this spoofing attempt because only the
``document.createElement`` is modified.

Also to not trigger falsely we also check if both methods claim to be a native
function. If this is not true, something else is creating this inconsistency,
so we don't trigger this check.
