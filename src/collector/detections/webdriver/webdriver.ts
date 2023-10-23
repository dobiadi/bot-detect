import IframeContext from '../../IframeContext';
import { isNative } from '../../utils';

declare global {
  interface Window {
    Navigator: ObjectConstructor;
  }
}

const detectOnWindow = (window: Window | null) => {
  if (window === null) {
    return false;
  }

  if (window.navigator.webdriver === true) {
    return true;
  }

  if (Object.prototype.hasOwnProperty.call(window.navigator, 'webdriver')) {
    return true;
  }

  try {
    'webdriver' in window.Navigator.prototype &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.Navigator.prototype.webdriver;
    return Object.prototype.hasOwnProperty.call(
      window.Navigator.prototype,
      'webdriver'
    );
  } catch (_) {
    // no-action
  }

  const propDesc = Object.getOwnPropertyDescriptor(
    window.Navigator.prototype,
    'webdriver'
  )?.get?.toString?.();

  if (propDesc && !isNative(propDesc)) {
    return true;
  }

  return false;
};

export default async function webdriver(): Promise<boolean> {
  return (
    detectOnWindow(window) ||
    detectOnWindow(IframeContext.getInstance().getWindow())
  );
}
