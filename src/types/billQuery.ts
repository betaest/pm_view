export interface DynamicComponent {
  tag: string;
  props?: Record<string, any>;
  on?: Record<string, Function>;
  text?: string;
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

export interface Result {
  total: number;
  title: Array<Text>;
  //[ {type: 'billing-cycle-picker', params: { values: '[201901,201902,201903,201904,201905]', value: 'new Date()' }}, '账期的费用：' ]
  header: Array<Column>;
  body: Array<Record<string, any>>;
  footer: Record<string, any>;
}
