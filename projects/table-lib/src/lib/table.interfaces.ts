export interface ITableOrderChange {
  item: any;
  oldIndex: number;
  newIndex: number;
  oldPage: number;
  newPage: number;
  globalIndex: number;
}

export interface ITableButtons {
  label: string;
  icon?: string;
  handler: () => void;
}

export interface ITableActions {
  label: string;
  handler: (item: any) => void;
  show?: (item: any) => boolean;
}

export interface ITableColumns {
  key: string;
  label: string;
  type?: string;
  transform?: (value: any, row: any) => any;
  width?: number | string;
}
