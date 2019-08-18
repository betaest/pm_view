export interface Text {
  tag: string;
  props?: string;
  on?: string;
  text?: string;
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
