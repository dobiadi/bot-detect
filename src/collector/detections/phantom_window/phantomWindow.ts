import IframeContext from '../../IframeContext';

const detectOnWindow = (window: Window | null): boolean => {
  if (window === null) {
    return false;
  }
  return 'callPhantom' in window || '_phantom' in window;
};

export default async function phantomWindow(): Promise<boolean> {
  return (
    detectOnWindow(window) ||
    detectOnWindow(IframeContext.getInstance().getWindow())
  );
}
