declare global {
  interface HTMLElement {
    msMatchesSelector(selectors: string): boolean;
    mozMatchesSelector(selectors: string): boolean;
  }
}
export default function closest(el: HTMLElement, selector: string): HTMLElement | null {
  if (el.closest) return el.closest(selector);

  const match = el.matches || el.webkitMatchesSelector || el.msMatchesSelector || el.mozMatchesSelector;

  while (el) {
    if (match.call(el, selector)) return el;
    else el = el.parentElement!;
  }
  return null;
}
