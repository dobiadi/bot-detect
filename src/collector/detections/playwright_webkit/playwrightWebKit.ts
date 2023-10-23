import { isDesktopSafari, isWebKit } from '../../utils';

export default async function playwrightWebKit(): Promise<boolean> {
  if (!isWebKit() || !isDesktopSafari()) {
    return false;
  }

  const canvas = document.createElement('canvas');
  const jpeg = canvas.toDataURL('image/jpeg').indexOf('data:image/jpeg') === 0;

  return (
    !('safari' in window) &&
    (!jpeg || ('ApplePayError' in window && !('ApplePaySession' in window)))
  );
}
