export interface Value {
  type: 'eval' | 'string';
  value: string;
}
export interface Title {
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
  state?: {
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
  width?: number;
  sortable?: boolean;
  fixed?: boolean;
  menu?: Record<number, string>;
}

export interface Row {
  [key: string]: any;
  children?: Row;
}

export interface Result {
  total: number;
  title: Array<Title>;
  //[ {tag: 'billing-cycle-picker', params: { values: '[201901,201902,201903,201904,201905]', text: 'new Date()' }}, '账期的费用：' ]
  header: Array<Column>;
  body: Array<Row>;
  footer?: Row;
}
