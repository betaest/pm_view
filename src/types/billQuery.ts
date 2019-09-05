export interface DynamicValue {
  type: 'eval' | 'string';
  value: string;
}
export interface DynamicString {
  tag: string;
  props?: Record<string, any>;
  on?: Record<string, Function>;
  text?: string;
}

export interface MenuItem {
  title: string;
  action: number;
}

export interface Menu {
  items: Array<MenuItem>;
  state: {
    visibility: boolean;
    left: number;
    top: number;
  };
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
  type?: 'selection' | 'expand';
  width?: number;
  sortable?: boolean;
  fixed?: boolean;
  menu?: Record<number, string>;
}

export interface Result {
  total: number;
  title: Array<DynamicString>;
  //[ {tag: 'billing-cycle-picker', params: { values: '[201901,201902,201903,201904,201905]', text: 'new Date()' }}, '账期的费用：' ]
  header: Array<Column>;
  body: Array<Record<string, any>>;
  footer?: Record<string, any>;
}
