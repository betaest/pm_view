export interface DynamicItem {
  type: string;
  params: Record<string, string>;
}

export interface FieldMenuItem {
  title: string;
  action: string;
  params?: Record<string, string>;
}

export interface ColumnInfo {
  title: string;
  key: string;
  width?: number;
  sortable?: boolean;
  menu?: Array<FieldMenuItem>;
}

export interface ResultInfo {
  total: number;
  title: Array<DynamicItem | string>;
  //[ {type: 'billing-cycle', params: { value: '201903' }}, '账期的费用：' ]
  columns: Array<ColumnInfo>;
  result: Array<Record<string, string>>;
}
