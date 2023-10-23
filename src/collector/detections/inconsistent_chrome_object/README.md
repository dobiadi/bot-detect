# Detect inconsistent chrome object

In case of headless Chrome, the `window.chrome` object is missing. This in
itself is not a strong enough check as this would generate a lot of false
positives. But this doesn't deter bots from patching this inconsistency anyway,
so what we can do is detect if this mocking is done inconsistently.

What this check does is it checks the consisteny between the original window's
`window.chrome` object and an iframe's `window.chrome` object.

If they are inconsistent with each other, then it is very likely a bot's
spoofing attempt.
