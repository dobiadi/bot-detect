import IframeContext from '../../IframeContext';

export default async function iframeChromeRuntime(): Promise<boolean> {
  const iframeWindow = IframeContext.getInstance().getWindow();

  if (iframeWindow === null) {
    return false;
  }

  return (
    'chrome' in iframeWindow &&
    'runtime' in iframeWindow.chrome &&
    'connect' in iframeWindow.chrome.runtime
  );
}
