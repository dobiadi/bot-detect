let proofOfWork: (verdict: boolean, token?: string) => string = (
  verdict: boolean
): string => {
  return verdict ? 'bot' : 'human';
};

export default class Detector {
  private static instance: Detector;
  private constructor() {}
  static getInstance() {
    if (Detector.instance === undefined) {
      Detector.instance = new Detector();
    }

    return Detector.instance;
  }

  detectorMap: Array<string | string[]> = [
    'errorTrapPhantomJS',
    'errorTrapPuppeteer',
    'errorTrapPlaywrightChrome',
    'errorTrapPlaywrightFirefox',
    'errorTrapPlaywrightWebKit',
    'errorTrapSeleniumChrome',
    'chromeDriver',
    'wrongChromeOrder',
    'inconsistentCloneError',
    'fakeCreateElement',
    ['firefoxDevTools', 'hiddenScroll', 'noHovermq'],
    'inconsistentChromeObject',
    'iframeChromeRuntime',
    'oldSelenium',
    'inconsistentPermissions',
    'phantomWindow',
    'playwrightOrientation',
    'playwrightWebKit',
    'toStringSpoofed',
    'webdriver',
    ['firefoxDevTools', 'webGLDisabled']
  ];

  setProofOfWorkFn(
    proofOfWorkFn: (verdict: boolean, token?: string) => string
  ) {
    proofOfWork = proofOfWorkFn;
  }

  detect(collectorResults: string[], token?: string): string {
    for (const detector of this.detectorMap) {
      if (typeof detector === 'string' && collectorResults.includes(detector)) {
        return proofOfWork(true, token);
      } else if (Array.isArray(detector)) {
        const all = detector.every((e) => {
          return collectorResults.includes(e);
        });
        if (all) {
          return proofOfWork(true, token);
        }
      }
    }
    return proofOfWork(false, token);
  }
}
