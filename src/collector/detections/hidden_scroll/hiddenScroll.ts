export default async function hiddenScroll(): Promise<boolean> {
  const div = document.createElement('div');
  const internalNode = document.createElement('div');

  let hiddenScroll = false;

  div.style.width = '100px';
  div.style.height = '200px';
  div.style.overflow = 'scroll';

  internalNode.style.width = '100px';
  internalNode.style.height = '200px';

  div.appendChild(internalNode);
  document.body.appendChild(div);

  if (div.clientWidth === div.offsetWidth) {
    hiddenScroll = true;
  }

  div.parentNode?.removeChild(div);

  return hiddenScroll;
}
