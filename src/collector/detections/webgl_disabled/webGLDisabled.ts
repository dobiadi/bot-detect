export default async function webGLDisabled(): Promise<boolean> {
  const canvas = document.createElement('canvas');

  let gl = null;

  try {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  } catch (_) {
    return true;
  }

  return !gl;
}
