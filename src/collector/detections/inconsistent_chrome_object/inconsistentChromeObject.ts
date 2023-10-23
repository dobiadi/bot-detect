import IframeContext from '../../IframeContext';

export default async function inconsistentChromeObject(): Promise<boolean> {
  const iframeWindow = IframeContext.getInstance().getWindow();

  if (iframeWindow === null) {
    return false;
  }

  return (
    !('chrome' in iframeWindow && 'loadTimes' in iframeWindow.chrome) &&
    'chrome' in window &&
    'loadTimes' in window.chrome
  );
}
