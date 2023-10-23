# Detect if PhantomJS is in use

A very simple check is that PhantomJS places a few properties on the global
window object. What we do is we just simply check their existence on the
original window and inside an iframe.

There are some more sophisticated methods for detecting PhantomJS when there's
some spoofing in play, but generally it is impractical to use this type of bot
nowadays.
