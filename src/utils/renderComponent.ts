import Vue, { CreateElement, RenderContext, VNode } from 'vue';
export default function renderComponent(
  el: string | Element,
  render: (createElement: CreateElement, hack?: RenderContext<Record<string, any>>) => VNode
) {
  return new Vue({
    render: render,
  }).$mount(el);
}
