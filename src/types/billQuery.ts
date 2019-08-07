export interface ParameterInfo {
    name: string;
    value: any;

    [name: string]: any;
}

export interface SqlInfo {
    parameter: ParameterInfo;

    action: string;
}

export interface ColumnInfo {
    title: string;
    key: string;
}

export interface ResultInfo {
    total: number;
}