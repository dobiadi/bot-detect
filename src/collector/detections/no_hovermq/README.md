# Detect if there's no hover capability

We can detect if the browser cannot 'hover'. This is usually the case in mobile
devices as there isn't a cursor, but sometimes headless browsers emit the same
behaviour.

In itself it is not a strong indicator of a headless browser, so it must be used
in combination with other checks.
