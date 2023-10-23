# Detect if the IdleDetector API is enabled

The IdleDetector API was part of the experimental APIs in Chrome before version
94. By default this API was disabled in the browser.

There are two main ways to enable this API on older Chrome versions:

* Enable experimental features in the browser
* Add the `--enable-blink-features=IdleDetection` argument on start

Puppeteer used to go for the second approach, IdleDetection was enabled with
a command line argument. So if we detect that the IdleDetector is enabled, but
other experimental features are not, and we are on a Chrome browser before
version 94, than we mark it as a bot.

This boils down to 3 things:

1. The `window.IdleDetector` object exists. This verifies that the API is enabled
1. Check if the `window.Magnetometer` object exists. This is an experimental
  API that should only be available if all experimental APIs were enabled.
1. We also check that `window.ImageTrack` and `window.Scheduler` objects don't
  exist. These APIs were released in version 94, so this validates that we are
  running a version less than 94. Note that we could parse the version from the
  userAgent, but that field is too easy to spoof, so it is not reliable.

Additionally to mitigate the risk of false postitives there are some extra
checks in place.
