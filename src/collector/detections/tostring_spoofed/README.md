# Detect spoofed toString function

Bots do a lot of spoofing to look like real browsers. But JavaScript functions
have a built-in method called `toString`, which would print out the function's
code when called. This is a simple way to detect overwritten functions, but of
course stealthier tools know this so they try to spoof this function as well.

There are a lot of different approaches, using JavaScript Proxy objects or just
simply overwriting the function itself. This detection tries to validate that
the `Function.prototype.toString` function is not tampered with.

Note that this might return false positives based on your framework/polyfills/build tool.
