export default function parent(el: HTMLElement, selector: string): HTMLElement {
  const match = el.matches || el.webkitMatchesSelector;

  let p = el.parentElement;

  while (p && !match.call(p, selector)) p = p.parentElement;

  return p as HTMLElement;
}
