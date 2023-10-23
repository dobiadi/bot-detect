# Detect Firefox DevTools

Firefox DevTools has an interesting feature. If it is running, javascript stack
traces are more explicit.

To reliable detect this, we create an error inside a Promise's ``then``
callback. If DevTools are open in the browser you would see ``callback*`` in
the stack trace string (which refers to our error in the Promise's callback).

Now why is it interesting in terms of bot detection.

Some automation tools use Firefox's CDP (Chrome DevTools Protocol)
implementation. As a sideeffect, this detection would trigger if this type of
automation is in use.

Of course this doesn't mean that the browser is a bot if this check triggers,
so it should be used in combination with other checks.
