# Detect wrong order of the chrome object's properties

This is once again the side effect of spoofing attempts, when they try to mock
a `window.chrome` object.

If you call `Object.keys` on the `window.chrome` object, keys should be in a
specific order. When you are creating a fake object, the order will be defined
by the order you are adding the keys to the Object. Thus there can be an
inconsistency if the spoofing is not thorough enough.
