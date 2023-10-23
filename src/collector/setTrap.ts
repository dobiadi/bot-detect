const signatures: Record<string, string[]> = {
  errorTrapPhantomJS: ['phantomjs'],
  errorTrapPuppeteer: ['puppeteer'],
  errorTrapPlaywrightChrome: ['t.default.evaluate'],
  errorTrapPlaywrightFirefox: ['juggler'],
  errorTrapPlaywrightWebKit: ['evaluate@', 'callFunctionOn@'],
  errorTrapSeleniumChrome: ['callFunction', 'apply.css selector']
};

/**
 * Returns a function that checks the stack trace of the caller by throwing an
 * error. This error is caught internally, and if a suspicious line is found in the stack trace,
 * it is added to the provided list. After that it just calls the original implementation
 * of the function.
 */
export default function setTrap(
  original: (...args: unknown[]) => unknown,
  arrayToPush: Set<string>
): () => void {
  return function (...args) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      null[0]();
    } catch (e) {
      const stackString = (e as Error).stack?.toString?.();

      if (stackString) {
        for (const [key, value] of Object.entries(signatures)) {
          if (value.every((e) => stackString.includes(e))) {
            arrayToPush.add(key);
          }
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return original.apply(this, args);
  };
}
