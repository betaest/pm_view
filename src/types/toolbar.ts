import { CreateElement, RenderContext, VNode } from 'vue';

export interface ToolbarContent {
  icon: string;
  title?: string;
  render?: (createElement: CreateElement, hack?: RenderContext<Record<string, any>>) => VNode;
}

export interface ToolbarItem {
  name: string;
  style?: object;
  content?: ToolbarContent;
}
