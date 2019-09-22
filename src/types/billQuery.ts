export interface Section {
  tag: string;
  props?: Record<string, any>;
  events?: Record<string, string | Function>;
  text?: string;
}

export interface MenuItem {
  title: string;
  action: number;
  divided?: boolean;
}

export interface MenuItemState {
  visibility: boolean;
  left: number;
  top: number;
  value: string;
}

export interface QueryJsonL {
  type: string;
  action: string;
  query: string;
  params?: Record<string, any>;
}

export interface Column {
  title: string;
  key: string;
  width?: number;
  sortable?: boolean;
  className?: string;
  render?: string | Function;
}

export interface Row {
  [key: string]: any;
  children?: Array<Row>;
}

export interface FlatRow extends Row {
  _parent: number;
  _children: number;
  _child_index: number;
  _status: boolean;
}

export interface Result {
  total: number;
  title: Array<Section>;
  //[ {tag: 'billing-cycle-picker', params: { values: '[201901,201902,201903,201904,201905]', text: 'new Date()' }}, '账期的费用：' ]
  header: Array<Column>;
  body: Array<Row>;
  footer?: Row;
}
