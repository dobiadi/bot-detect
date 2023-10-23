export default async function noHovermq(): Promise<boolean> {
  return !matchMedia('(hover)').matches;
}
