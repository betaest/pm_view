function match(this: HTMLElement, el: string | HTMLElement) {
  const proc = this.matches || this.webkitMatchesSelector || this.msMatchesSelector || this.mozMatchesSelector;

  return typeof el === 'string' ? proc.call(this, el) : this === el;
}
export default function closest(el: HTMLElement | EventTarget | null, selector: string | HTMLElement): HTMLElement | null {
  if (!el) return null;

  let t = el as HTMLElement;

  if (typeof selector === 'string' && t.closest) return t.closest(selector);

  while (t) {
    if (match.call(t, selector)) return t;
    else t = t.parentElement!;
  }

  return null;
}
