# Detect if there's a runtime chrome property in an iframe

In some spoofing cases, when you create an iframe, its ``contentWindow``
property is redirected to the main window, because otherwise some
inconsistencies would be detectable using the iframe's fresh window APIs.

Iframes should not have a `runtime` property on their `window.chrome` object.
Also, simple spoofing tools often just create a mocked `window.chrome` object
to hide the fact that headless Chrome generally doesn't have this object.
If the iframe's window is proxied to the real window, or a weak spoofing attempt
is made, the iframe's `window.chrome` object is going to have a `runtime`
property, which is easy to detect.

