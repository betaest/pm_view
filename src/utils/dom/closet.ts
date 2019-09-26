function match(this: HTMLElement, el: string | HTMLElement) {
  const proc = this.matches || this.webkitMatchesSelector || this.msMatchesSelector || this.mozMatchesSelector;

  return typeof el === 'string' ? proc.call(this, el) : this === el;
}
export default function closest(el: HTMLElement | null, selector: string | HTMLElement): HTMLElement | null {
  if (!el) return null;

  if (typeof selector === 'string' && el.closest) return el.closest(selector);

  while (el) {
    if (match.call(el, selector)) return el;
    else el = el.parentElement!;
  }

  return null;
}
