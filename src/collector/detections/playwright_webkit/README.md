# Detect Playwright WebKit

This is a bit tricky as there are not many WebKit based bot tools. It isn't
hard to differentiate between a real Safari and this bot, and on Windows there
are not really any legit WebKit based browsers. But on Linux there's a decent
variety of WebKit browsers which all behave slightly differently.

This detection simply checks the availability of some features in the browser
to mark it as Playwright.
