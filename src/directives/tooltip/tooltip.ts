import './tooltip.scss';
import { DirectiveOptions, DirectiveFunction } from 'vue';
import { closest, offset } from '@/utils/dom';

const tooltipCtrl = document.createElement('div');
tooltipCtrl.classList.add('g-d-tooltip');

const arrow = document.createElement('div');
arrow.classList.add('g-d-tooltip-arrow');

const contentCtrl = document.createElement('div');
contentCtrl.classList.add('g-d-tooltip-content');

tooltipCtrl.append(arrow, contentCtrl);

interface ContentValue {
  binder: HTMLElement;
  el: HTMLElement;
  content: string;
}

interface Content {
  isContainer: boolean;
  el: HTMLElement;
  content: Record<number, ContentValue> | string;
}

let controlCount: number = 1;
const tips: Record<number, Content> = {};
let pop: HTMLElement | undefined = undefined;

function showTip(el: HTMLElement, value: string) {
  const pos = offset(el);

  tooltipCtrl.classList.remove('g-da-show-tip');
  tooltipCtrl.style.left = `${pos.left}px`;
  tooltipCtrl.style.top = `${pos.top + el.offsetHeight}px`;
  tooltipCtrl.querySelector('.g-d-tooltip-content')!.textContent = value;
  tooltipCtrl.classList.add('g-da-show-tip');
}

const bind: DirectiveFunction = () =>
  !document.querySelector('.g-d-tooltip') ? document.body.appendChild(tooltipCtrl) : undefined;

const inserted: DirectiveFunction = (el, binding) => {
  const container =
    (typeof binding.value === 'object' && binding.value.container ? closest(el, binding.value.container) : undefined) ||
    el;
  const binder =
    (typeof binding.value === 'object' && binding.value.binder ? closest(el, binding.value.binder) : undefined) || el;
  const tip = typeof binding.value === 'object' ? binding.value.content : binding.value;

  let containerId: number = container.$uniqueid;
  let binderId: number = binder.$uniqueid;
  const isContainer = container !== el;
  const content: ContentValue = {
    binder,
    el,
    content: tip,
  };

  if (!containerId) containerId = container.$uniqueid = controlCount++;
  if (!binderId) binderId = binder.$uniqueid = controlCount++;

  if (!(containerId in tips)) {
    tips[containerId] = {
      isContainer,
      el: container,
      content: isContainer
        ? {
            [binderId]: content,
          }
        : content.content,
    };

    container.addEventListener('mouseover', e => {
      const t = e.target || e.srcElement;
      const c = tips[containerId];

      if (c.isContainer && typeof c.content === 'object')
        for (let name in c.content) {
          const tt = closest(t as HTMLElement, c.content[name].binder);

          if (tt && tt !== pop) {
            showTip(tt, c.content[name].content);
            pop = tt;

            return;
          }
        }
      else if (t === c.el && c.el !== pop) {
        showTip(t as HTMLElement, c.content as string);
        pop = c.el;
      }
    });
    container.addEventListener('mouseout', e => {
      if (pop) {
        tooltipCtrl.classList.remove('g-da-show-tip');
        pop = undefined;
      }
    });
  } else {
    if (!isContainer) return;

    const containerTip = tips[containerId];

    if (typeof containerTip.content === 'object' && !(binderId in containerTip.content))
      containerTip.content[binderId] = content;
  }
};

export const tooltip: DirectiveOptions = {
  bind,
  inserted,
};
