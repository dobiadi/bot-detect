export default async function firefoxDevTools() {
  return new Promise<boolean>((resolve) => {
    new Promise<void>((r) => r()).then(() => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        null[0]();
      } catch (e) {
        return resolve(
          /callback\*/.test((e as Error)?.stack?.toString?.() || '')
        );
      }

      return resolve(true);
    });
  });
}
