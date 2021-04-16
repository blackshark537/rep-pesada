import { SelectedActions } from './table/table.component';

export * from './table/table.component';
export interface TableEvent{
    action: SelectedActions,
    row: any
}

export interface TableActions{
    new: boolean;
    open: boolean;
    delete?: boolean;
}