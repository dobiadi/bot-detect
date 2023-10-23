# Detecting is WebGL is disabled in the browser

There was a bug in headless Firefox which meant that the WebGL feature did not
work at all. So this detection simply checks if WebGL is enabled or not.

This is not a strong indicator of a bot at all, because disabling this feature
also improves privacy in the browser so these are more often just some privacy-focused
people rather than bots. It only has added value in combination with other checks.
