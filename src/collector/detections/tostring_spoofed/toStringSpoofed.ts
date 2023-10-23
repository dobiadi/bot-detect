import { isChromium, isNative } from '../../utils';

export default async function toStringSpoofed(): Promise<boolean> {
  try {
    window.postMessage(Function.prototype.toString);
    return true;
  } catch (e) {
    const msg = (e as Error).message;
    if (/\[object Function\]|#<Function>/.test(msg)) {
      return true;
    }
  }

  const propDesc: string | undefined = Object.getOwnPropertyDescriptor(
    Function.prototype,
    'toString'
  )?.value?.toString?.();

  if (propDesc && !isNative(propDesc)) {
    return true;
  }

  const nativeProto = Object.getPrototypeOf(Function.prototype.toString);

  let result = false;

  try {
    Object.setPrototypeOf(
      Function.prototype.toString,
      Function.prototype.toString
    ) + '';
    result = true;
  } catch (e) {
    if (
      (e as Error).constructor.name !== 'TypeError' ||
      (isChromium() && (e as Error).stack?.split('setPrototypeOf').length !== 2)
    ) {
      result = true;
    }
  } finally {
    Object.setPrototypeOf(Function.prototype.toString, nativeProto);
  }

  return result;
}
