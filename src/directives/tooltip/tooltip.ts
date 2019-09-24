import './tooltip.scss';
import { DirectiveOptions, DirectiveFunction } from 'vue';
import { parent } from '@/utils/dom';

interface Tooltip {
  el: HTMLElement;
  container?: HTMLElement;
  content: string;
}

const tooltipCtrl = document.createElement('div');
tooltipCtrl.classList.add('g-d-tooltip');

const arrow = document.createElement('div');
arrow.classList.add('g-d-tooltip-arrow');

const contentCtrl = document.createElement('div');
contentCtrl.classList.add('g-d-tooltip-content');

tooltipCtrl.append(arrow, contentCtrl);

const tips: Array<Tooltip> = [];

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
//       const container = parent(el, binding.value.container);
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
