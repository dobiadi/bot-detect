# Detecting bad default orientation on Playwright Chrome

If you get the screen orientation on Playwright automated Chrome, you
would get `landscape-primary` with an angle of `90`. Now if you are not familiar
with what this is, it means that the screen is currently in it's primary
landscape mode, and it is rotated by 90 degrees from the default orientation.
Which means that the default orientation is portrait mode.

Now this is suspicious if you are not on a mobile device.

This is the idea behind the detection but there are some additional checks to
lower the risk of false positives, e.g. ignoring mobile devices and checking for
incognito mode as Playwright runs browsers in incognito mode by default.
