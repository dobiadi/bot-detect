# Detecting webdriver

`navigator.webdriver` is a boolean flag to indicate that the browser is automated.
This is the most trivial way to detect bots, but as such this is also the most
spoofed one.

This detection not only reads this property, but also validates that it was not
tampered with some simple JavaScript property overwriting.

The simplest undetectable way to disable this flag is to start Chrome with the
`--disable-blink-features=AutomationControlled` argument. So this detection is
a very strong indicator if something is a bot, but there's a trivial workaround
built-in to Chrome.
