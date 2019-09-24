import './tooltip.scss';
import { DirectiveOptions } from 'vue';
import { parent } from '@/utils/dom';

export const tooltip: DirectiveOptions = {
  bind(el, binding) {
      console.log('bind', el);
    // let tooltip = document.querySelector('.tbq-tooltip') as HTMLElement;

    // if (!tooltip) {
    //   tooltip = document.createElement('div');
    //   tooltip.classList.add('tbq-tooltip');
    //   const arrow = document.createElement('div');
    //   arrow.classList.add('tooltip-arrow');
    //   const content = document.createElement('div');
    //   content.classList.add('tooltip-content');
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
  },
  inserted(el) {
    console.log('inserted', el);
  },
  update(el) {
    console.log('update', el);
  },

  unbind(el, binding) {
      console.log('unbind', el);
  },
};
