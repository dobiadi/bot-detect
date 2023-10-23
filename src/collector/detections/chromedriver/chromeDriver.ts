import { isChromium } from '../../utils';

const IGNORED = ['webkitStorageInfo'];

export default async function chromeDriver(): Promise<boolean> {
  // Only check if Chromium is used
  if (!isChromium()) {
    return false;
  }

  const docKeys = Object.keys(window.document) as Array<keyof Document>;

  for (const docKey of docKeys) {
    if (
      typeof window.document[docKey] === 'object' &&
      window.document[docKey] !== null &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      'cache_' in window.document[docKey]
    ) {
      return true;
    }
  }

  const winList = ['Array', 'Promise', 'Symbol'];

  const winKeys = Object.keys(window);

  const foundList: string[] = [];

  // Check if there is a second Array, Promise, and Symbol on the window
  for (const winKey of winKeys) {
    // Ignore some keys to not get warnings
    if (IGNORED.includes(winKey)) {
      continue;
    }

    for (const item of winList) {
      if (
        winKey !== item &&
        !foundList.includes(winKey) &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window[winKey] === window[item]
      ) {
        foundList.push(winKey);
      }
    }
  }

  return foundList.length === 3;
}
