import chromeDriver from './detections/chromedriver/chromeDriver';
import wrongChromeOrder from './detections/wrong_chrome_order/wrongChromeOrder';
import inconsistentCloneError from './detections/inconsistent_clone_error/inconsistentCloneError';
import fakeCreateElement from './detections/fake_createElement/fakeCreateElement';
import firefoxDevTools from './detections/firefox_devtools/firefoxDevTools';
import hiddenScroll from './detections/hidden_scroll/hiddenScroll';
import inconsistentChromeObject from './detections/inconsistent_chrome_object/inconsistentChromeObject';
import iframeChromeRuntime from './detections/iframe_chrome_runtime/iframeChromeRuntime';
import noHovermq from './detections/no_hovermq/noHovermq';
import oldSelenium from './detections/old_selenium/oldSelenium';
import inconsistentPermissions from './detections/inconsistent_permissions/inconsistentPermissions';
import phantomWindow from './detections/phantom_window/phantomWindow';
import playwrightOrientation from './detections/playwright_orientation/playwrightOrientation';
import playwrightWebKit from './detections/playwright_webkit/playwrightWebKit';
import toStringSpoofed from './detections/tostring_spoofed/toStringSpoofed';
import webdriver from './detections/webdriver/webdriver';
import webGLDisabled from './detections/webgl_disabled/webGLDisabled';
import IframeContext from './IframeContext';
import setTrap from './setTrap';

type DetectionFunction = () => Promise<boolean>;

const toRestore: Array<() => void> = [];
const trapTriggers: Set<string> = new Set();

export default class Collector {
  private static instance: Collector;
  private detections: Record<string, DetectionFunction> = {
    chromeDriver,
    wrongChromeOrder,
    inconsistentCloneError,
    fakeCreateElement,
    firefoxDevTools,
    hiddenScroll,
    inconsistentChromeObject,
    iframeChromeRuntime,
    noHovermq,
    oldSelenium,
    inconsistentPermissions,
    phantomWindow,
    playwrightOrientation,
    playwrightWebKit,
    toStringSpoofed,
    webdriver,
    webGLDisabled
  };

  trapSelectors = [
    'Document:querySelector',
    'Document:querySelectorAll',
    'Document:getElementById',
    'window:eval'
  ];

  private constructor() {}
  static getInstance() {
    if (Collector.instance === undefined) {
      Collector.instance = new Collector();
    }

    return Collector.instance;
  }

  async collect(): Promise<string[]> {
    const promises: Promise<boolean>[] = [];
    for (const detectFunction in this.detections) {
      promises.push(this.detections[detectFunction]());
    }
    const results = await Promise.allSettled(promises);

    const detecteds: string[] = [];
    for (let i = 0; i < results.length; i++) {
      const value =
        results[i].status === 'rejected'
          ? undefined
          : (results[i] as PromiseFulfilledResult<boolean>).value;
      if (value) {
        detecteds.push(Object.keys(this.detections)[i]);
      }
    }
    IframeContext.getInstance().destroy?.();
    for (const restore of toRestore) {
      restore();
    }
    return [...detecteds, ...Array.from(trapTriggers)];
  }

  enableTraps(): void {
    for (const toTrap of this.trapSelectors) {
      const [obj, func] = toTrap.split(':');
      let apiObj: Document | Window | null = null;
      if (obj === 'Document') {
        apiObj = Document.prototype;
      } else {
        apiObj = window;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const original = apiObj[func];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      apiObj[func] = setTrap(original, trapTriggers);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toRestore.push(() => (apiObj[func] = original));
    }
  }
}
