import { isChromium } from '../../utils';

interface hasJsHeapLimit {
  jsHeapSizeLimit?: number;
}

interface DeprecatedStorageQuota {
  queryUsageAndQuota?: (fn: (usage: number, quota: number) => unknown) => void;
}

declare global {
  interface Performance {
    memory?: hasJsHeapLimit;
  }
}

declare global {
  interface Navigator {
    webkitTemporaryStorage?: DeprecatedStorageQuota;
  }
}

const detectIncognito = async (): Promise<boolean> => {
  const jsheaplimit =
    window?.performance?.memory?.jsHeapSizeLimit || 1000000000;

  const quota: number =
    (await new Promise((resolve) => {
      navigator.webkitTemporaryStorage?.queryUsageAndQuota?.((_u, quota) => {
        return resolve(quota);
      });
    })) || jsheaplimit;

  const storage =
    ((await navigator.storage?.estimate?.()) || {}).quota || jsheaplimit;

  const maxQuota = Math.min(quota, storage);

  return maxQuota < jsheaplimit;
};

export default async function playwrightOrientation(): Promise<boolean> {
  if (!isChromium()) {
    return false;
  }

  const incognito = await detectIncognito();

  return (
    incognito &&
    !('chrome' in window && 'runtime' in window.chrome) &&
    'SharedWorker' in window &&
    window.screen?.orientation?.type === 'landscape-primary' &&
    window.screen?.orientation?.angle === 90
  );
}
