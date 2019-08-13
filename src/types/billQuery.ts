export interface DynamicItem {
  type: string;
  params: Record<string, string>;
}

export interface FieldMenuItem {
  title: Array<DynamicItem | string>;
  action: string;
  params?: Record<string, any>;
}

export interface ColumnInfo {
  title: Array<DynamicItem | string>;
  key: string;
  width?: number;
  sortable?: boolean;

  fixed?: boolean;
  menu?: Array<FieldMenuItem>;
}

export interface ResultInfo {
  total: number;
  title: Array<DynamicItem | string>;
  //[ {type: 'billing-cycle-picker', params: { values: '[201901,201902,201903,201904,201905]', value: 'new Date()' }}, '账期的费用：' ]
  header: Array<ColumnInfo>;
  body: Array<Record<string, any>>;
  footer: Record<string, any>;
}
