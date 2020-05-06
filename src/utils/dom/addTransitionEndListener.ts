export default function addTransitionEndListener(el: HTMLElement, callback: (e: TransitionEvent) => void) {
    const events = ['msTransitionEnd', 'mozTransitionEnd', 'oTransitionEnd', 'webkitTransitionEnd', 'transitionend'];
    const handler = {
      handleEvent(ev: TransitionEvent) {
        for (const e of events) el.removeEventListener(e, handler);
  
        callback.bind(el)(ev);
      },
    };
  
    for (const e of events) el.addEventListener(e, handler);
  }