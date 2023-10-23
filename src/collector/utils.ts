const NATIVE_REGEX = /\(\)\s*{\s+\[native code\]\s+}\s*$/;

function isNative(str: string): boolean {
  if (NATIVE_REGEX.test(str)) {
    return true;
  }
  return false;
}

function hideElement(element: HTMLElement) {
  element.style.visibility = 'hidden';
  element.style.position = 'absolute';
  element.style.top = '0';
  element.style.left = '-9999px';
}

// Source: https://github.com/fingerprintjs/fingerprintjs/blob/f1978aeb684f1b5b7a035f6d077524303e35bbff/src/utils/browser.ts#L52
function isChromium() {
  return (
    ('webkitPersistentStorage' in navigator ? 1 : 0) +
      ('webkitTemporaryStorage' in navigator ? 1 : 0) +
      (navigator.vendor.indexOf('Google') === 0 ? 1 : 0) +
      ('webkitResolveLocalFileSystemURL' in window ? 1 : 0) +
      ('BatteryManager' in window ? 1 : 0) +
      ('webkitMediaStream' in window ? 1 : 0) +
      ('webkitSpeechGrammar' in window ? 1 : 0) >=
    5
  );
}

// Source: https://github.com/fingerprintjs/fingerprintjs/blob/f1978aeb684f1b5b7a035f6d077524303e35bbff/src/utils/browser.ts#L77
function isWebKit() {
  return (
    ('ApplePayError' in window ? 1 : 0) +
      ('CSSPrimitiveValue' in window ? 1 : 0) +
      ('Counter' in window ? 1 : 0) +
      (navigator.vendor.indexOf('Apple') === 0 ? 1 : 0) +
      ('getStorageUpdates' in navigator ? 1 : 0) +
      ('WebKitMediaKeys' in window ? 1 : 0) >=
    4
  );
}

// Source: https://github.com/fingerprintjs/fingerprintjs/blob/f1978aeb684f1b5b7a035f6d077524303e35bbff/src/utils/browser.ts#L100
function isDesktopSafari() {
  return (
    ('safari' in window ? 1 : 0) +
      ('DeviceMotionEvent' in window ? 0 : 1) +
      ('ongestureend' in window ? 0 : 1) +
      ('standalone' in navigator ? 0 : 1) >=
    3
  );
}

export { isNative, hideElement, isChromium, isWebKit, isDesktopSafari };
