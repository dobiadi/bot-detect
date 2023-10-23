import { isChromium } from '../../utils';

export default async function idleDetector(): Promise<boolean> {
  if (!isChromium()) {
    return false;
  }

  return (
    'IdleDetector' in window &&
    !(
      'ImageTrack' in window ||
      'Scheduler' in window ||
      'Magnetometer' in window
    ) &&
    !('chrome' in window && 'runtime' in window.chrome)
  );
}
