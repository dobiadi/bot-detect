import IframeContext from '../../IframeContext';

const detectOnWindow = (window: Window | null): boolean => {
  if (window === null || !('chrome' in window)) {
    return false;
  }

  const keys = Object.keys(window.chrome);

  if (keys.includes('loadTimes') && keys[0] !== 'loadTimes') {
    return true;
  }

  return false;
};

export default async function wrongChromeOrder(): Promise<boolean> {
  return (
    detectOnWindow(window) ||
    detectOnWindow(IframeContext.getInstance().getWindow())
  );
}
