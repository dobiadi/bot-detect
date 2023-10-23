import { hideElement } from './utils';

export default class IframeContext {
  private iframe: HTMLIFrameElement;
  destroy: () => void;

  getWindow(): Window | null {
    return this.iframe.contentWindow;
  }

  private static instance: IframeContext;
  private constructor() {
    // Work around possible spoofing by not calling createElement directly
    const iframe = Document.prototype.createElement.apply(document, [
      'iframe'
    ]) as HTMLIFrameElement;
    hideElement(iframe);
    window.document.body.appendChild(iframe);
    iframe.srcdoc = '';
    this.iframe = iframe;
    this.destroy = () => {
      iframe.parentNode?.removeChild(iframe);
    };
  }

  static getInstance(): IframeContext {
    if (IframeContext.instance === undefined) {
      IframeContext.instance = new IframeContext();
    }

    return IframeContext.instance;
  }
}
