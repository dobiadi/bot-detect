import IframeContext from '../../IframeContext';

export default async function inconsistentCloneError(): Promise<boolean> {
  const iframeWindow = IframeContext.getInstance().getWindow();
  if (iframeWindow === null) {
    return false;
  }

  let error = '';

  try {
    window.postMessage(iframeWindow);
    return true;
  } catch (e) {
    error = (e as Error).message;
  }

  return /\[object Object\]|#<Window>/.test(error);
}
