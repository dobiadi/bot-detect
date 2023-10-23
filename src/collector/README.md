# Setting JavaScript traps

An interesting behaviour of automating scripts, is that under the hood in most
cases they also use JavaScript to interact with the page. This JavaScript runs
in a different context, so there's no way of detecting it from the page, but:

If the automation script needs to find an element in the DOM, it will directly
use the DOM API in the page (like `document.getElementById`). Now if that API
were to throw an error, the call stack would contain the function names
of the automation tool.

That's why it is called a 'trap' instead of a detection because we can not
force the automation to reveal itself, but we can overwrite the DOM APIs, so they
throw an error when called (of course we catch this error and then continue with
the original functionality). If they call one of these overwritten functions,
they have 'fallen into our trap'.

This doesn't work in all cases, and there are stealth tools that can hide this
behaviour. Also unlike other detections which work 'instantly', here we have to
set the traps, and then on a later time (when the other detections are running)
we have to check our trap results.

Additionally it can have a performance impact if selector DOM APIs are heavily
utilized on the page.
