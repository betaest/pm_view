import './tooltip.scss';
import { DirectiveOptions, DirectiveFunction } from 'vue';
import { closest, offset } from '@/utils/dom';

let overTooltip = false;
let overRow = false;

const tooltipCtrl = document.createElement('div');
tooltipCtrl.classList.add('g-d-tooltip');

const arrow = document.createElement('div');
arrow.classList.add('g-d-tooltip-arrow');

const contentCtrl = document.createElement('div');
contentCtrl.classList.add('g-d-tooltip-content');

tooltipCtrl.append(arrow, contentCtrl);
tooltipCtrl.addEventListener('mouseover', () => (overTooltip = true));
tooltipCtrl.addEventListener('mouseout', () => (overTooltip = false));

interface ContentValue {
  binder: HTMLElement;
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
  tooltipCtrl.style.visibility = '';
  tooltipCtrl.style.left = `${pos.left}px`;
  tooltipCtrl.style.top = `${pos.top + el.offsetHeight - 12}px`;
  tooltipCtrl.querySelector('.g-d-tooltip-content')!.textContent = value;
  tooltipCtrl.classList.add('g-da-show-tip');
}

function hideTip() {
  if (pop && !overTooltip && !overRow) {
    tooltipCtrl.classList.remove('g-da-show-tip');
    pop = undefined;
  }

  return;
}

setInterval(hideTip, 100);

const bind: DirectiveFunction = () =>
  !document.querySelector('.g-d-tooltip') ? document.body.appendChild(tooltipCtrl) : undefined;

const inserted: DirectiveFunction = (el, binding) => {
  const container =
    (typeof binding.value === 'object' && binding.value.container && closest(el, binding.value.container)) || el;
  const binder = (typeof binding.value === 'object' && binding.value.binder && closest(el, binding.value.binder)) || el;
  const tip = typeof binding.value === 'object' ? binding.value.content : binding.value;

  const isContainer = container !== el;
  const content: ContentValue = {
    binder,
    content: tip,
  };

  const cid = container.$uniqueid && (container.$uniqueid = controlCount++);
  const bid = binder.$uniqueid && (binder.$uniqueid = controlCount++);

  if (!(cid in tips)) {
    tips[cid] = {
      isContainer,
      el: container,
      content: isContainer
        ? {
            [bid]: content,
          }
        : content.content,
    };

    container.addEventListener('mouseover', e => {
      const c = tips[cid];
      const target = e.target || e.srcElement;

      overRow = true;

      if (c.isContainer && typeof c.content === 'object')
        for (let name in c.content) {
          const t = closest(target, c.content[name].binder);

          if (t && t !== pop) {
            showTip(t, c.content[name].content);
            pop = t;

            return;
          }
        }
      else if (target === c.el && c.el !== pop) {
        showTip(target as HTMLElement, c.content as string);
        pop = c.el;
      }
    });
    container.addEventListener('mouseout', e => {
      overRow = false;
    });
  } else {
    if (!isContainer) return;

    const containerTip = tips[cid];

    if (typeof containerTip.content === 'object' && !(bid in containerTip.content)) containerTip.content[bid] = content;
  }
};

export const tooltip: DirectiveOptions = {
  bind,
  inserted,
};
