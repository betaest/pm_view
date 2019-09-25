import './tooltip.scss';
import { DirectiveOptions, DirectiveFunction } from 'vue';
import { closest } from '@/utils/dom';

declare global {
  interface HTMLElement {
    $symbol: symbol;
  }
}

const tooltipCtrl = document.createElement('div');
tooltipCtrl.classList.add('g-d-tooltip');

const arrow = document.createElement('div');
arrow.classList.add('g-d-tooltip-arrow');

const contentCtrl = document.createElement('div');
contentCtrl.classList.add('g-d-tooltip-content');

tooltipCtrl.append(arrow, contentCtrl);

const tips: Record<symbol, Record<symbol, { content: string }> | { content: string }> = {};
const listeners: Array<HTMLElement> = [];

const bind: DirectiveFunction = () =>
  !document.querySelector('.g-d-tooltip') ? document.body.appendChild(tooltipCtrl) : undefined;

// let tooltip = document.querySelector('.g-d-tooltip') as HTMLElement;
// if (!tooltip) {
//   tooltip = document.createElement('div');
//   tooltip.classList.add('g-d-tooltip');
//   const arrow = document.createElement('div');
//   arrow.classList.add('g-d-tooltip-arrow');
//   const content = document.createElement('div');
//   content.classList.add('g-tooltip-content');
//   tooltip.appendChild(arrow);
//   tooltip.appendChild(content);
//   document.body.appendChild(tooltip);
//   if (binding.value) {
//     if (binding.value.container) {
//       const container = closest(el, binding.value.container);
//       console.log(container);
//       if (container) {
//         container.addEventListener('mouseover', ev => {
//           if (!tooltip) return;
//           tooltip.style.display = 'none';
//           const e = ev.target || ev.srcElement;
//           if (e && e === el) {
//             tooltip.style.left = `${ev.clientX}px`;
//             tooltip.style.top = `${ev.clientY}px`;
//             content.innerText = typeof binding.value === 'object' ? binding.value.content : binding.value;
//             tooltip.style.display = 'block';
//           }
//         });
//       }
//     }
//   }
// }

const inserted: DirectiveFunction = (el, binding) => {
  const container =
    typeof binding.value === 'object' && binding.value.container ? closest(el, binding.value.container) : undefined;
  const binder = typeof binding.value === 'object' && binding.value.binder ? closest(el, binding.value.binder) : el;

  let bd: { content: string };

  if (container && binder) {
    if (!container.$symbol) container.$symbol = Symbol();
    if (!binder.$symbol) binder.$symbol = Symbol();

    let cc = tips[container.$symbol];
    if (!cc) cc = tips[container.$symbol] = {};

    bd = cc[binder.$symbol];
    if (!bd) bd = cc[binder.$symbol] = {};

    bd.content = typeof binding.value === 'object' ? binding.value.content : binding.value;
  }

  // tips.push({
  //   el: typeof binding.value === 'object' && binding.value.binder ? closest(el, binding.value.binder) : el,
  //   container,
  //   content: typeof binding.value === 'object' ? binding.value.content : binding.value,
  // });
};

export const tooltip: DirectiveOptions = {
  bind,
  inserted,
  update(el) {
    console.log('update', el);
  },

  unbind(el, binding) {
    console.log('unbind', el);
  },
};
