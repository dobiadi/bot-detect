import { isNative } from '../../utils';

export default async function fakeCreateElement(): Promise<boolean> {
  try {
    Document.prototype.createElement('span');
    return true;
  } catch (_e) {
    if (
      isNative(Document.prototype.createElement.toString()) &&
      isNative(window.document.createElement.toString())
    ) {
      return Document.prototype.createElement !== window.document.createElement;
    }
  }

  return false;
}
