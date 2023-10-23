# Javascript bot and automation detection library

**NOTE**: The research and evaluation of this library was done in 2021. I can
not guarantee that it is still able to detect all listed bots, nor do I provide
support for this library. I also do not plan on continuing the development.

## Detected bots

The library is aiming to detect the following tools primarily:

* PhantomJS ([https://github.com/ariya/phantomjs](https://github.com/ariya/phantomjs))
* Selenium Chrome/Firefox ([https://github.com/SeleniumHQ/selenium](https://github.com/SeleniumHQ/selenium))
* Selenium undetected_chromedriver ([https://github.com/ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver))
* Selenium stealth ([https://github.com/diprajpatra/selenium-stealth](https://github.com/diprajpatra/selenium-stealth))
* Puppeteer Chrome/Firefox ([https://github.com/puppeteer/puppeteer](https://github.com/puppeteer/puppeteer))
* Puppeteer-extra-plugin-stealth ([https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth))
* Playwright Chrome/Firefox/WebKit ([https://github.com/microsoft/playwright](https://github.com/microsoft/playwright))
* SecretAgent/Hero ([https://github.com/ulixee/secret-agent](https://github.com/ulixee/secret-agent))

These are higher level bots, which have a JavaScript engine enabled. To fully
utilize the bot detecting capabilities you should ensure that your site cannot
be used without enabling JavaScript.

You can also find some documentation for each bot detection signal under `src/collector/detections`.

## Demo

The demo page is accessible at [https://bot.dobiadi.dev](https://bot.dobiadi.dev).
(Please do not use the 'Back' button on your browser because then you will always
get `Invalid proof of work` as a result)

## Usage

This library is not published as an npm package.

You can build it using
```bash
npm run build
```

This will output two files, `botdetect.min.js` and `botdetect-clean.min.js`. The
only difference between the two is whether it includes polyfills or not.

Include one of them on your website and then you can utilize the bot detection functionality.

Initialize it on site load:
```javascript
BotDetect.collector.enableTraps();
```

Then later on a user action that requires validation:
```javascript
const results = await BotDetect.collector.collect();
// 'results' will contain a list of suspicious flags related to bots
// You can do whatever you want with it, but a default evaluator is available
// as BotDetect.detector to return 'human'/'bot' based on the flags.

const output = BotDetect.detector.detect(results);
// By default the output is either 'bot' or 'human'
```

## Considerations

It is always better to catch threats as soon as possible so if you can, you should
also enable server-side protections as well.
For example the demo page uses HAProxy with the following features:
* Request rate limiting on a per IP basis
* IP blacklist based on https://github.com/stamparm/ipsum
* User-Agent HTTP header filtering based on https://github.com/JayBizzle/Crawler-Detect/blob/master/src/Fixtures/Crawlers.php
* Proper Content-Security-Policy header to prohibit the browser from loading unwanted scripts

Additionally, the method described in the `Usage` section of this document is just a quick example.
If you purely rely on JavaScript to block requests from bots to your backend, then it is easy to bypass.

Imagine that someone can just send POST requests to `/login` via `curl` without even loading your page.
The simplest way to solve this is via CSRF tokens:
* Generate a random token server-side and send it to the client when they load the login page.
* When they submit the login form, also pass this token alongside other data in the POST request.
* The server should validate that the token is present, and it has the expected value.

Note that in practice it only ensures that the attacker loaded the webpage first before sending a POST
request. It is still possible to automate this via `curl` if you can parse out the token from the HTML.

The demo page follows a similar logic:
* The webserver generates a random token and sends it to the client when they load the page.
* The `BotDetect` library's `detector` can take an arbitrary function via its `BotDetect.detector.setProofOfWorkFn`
  method. This function takes two arguments; the bot detection result (boolean) and the token (string),
  and outputs a new token generated from the two. This new token is then added to the POST request.
* The server receives this new token. It also knows the original token and the proofOfWork function and
  the fact that the bot detection can result in either true or false. So it calculates both possibilities
  and compares them to the received token to determine whether the request came from a bot or a human.
  Of course invalid tokens are simply rejected.
