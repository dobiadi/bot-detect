# Detect if an iframe contentWindow is proxied

After creating a new iframe, we can get it's contentWindow property to get a
fresh Window object with untouched APIs.

This is something that could easily ruin most spoofing attempts, so some stealth
bot tools would create a JavaScript Proxy object to replace this property.

It works nicely from a spoofing perspective, so our goal is to detect if the
iframe's contentWindow is a Proxy or not. There's no direct method for that, so
we will reach for a handy trick that is used often to detect this kind of
spoofing: forcing the browser to throw an exotic error, that would enable us to
differentiate between proxied and real objects.

In this case calling `window.sendMessage` would try to clone the input as it
can not be passed by reference to the target. This cloning would fail anyway,
because you cannot clone either the Proxy nor the Window object. But it generates
a different error message for these two cases.
