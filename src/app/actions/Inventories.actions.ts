import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { InventoryInterface } from '../models';

const GET_INVENTORIES = createAction('Get all inventories');
const GET_INVENTORIES_SUCCEEDED = createAction('Get all inventories succeeded', props<{inventories: InventoryInterface[]}>());
const GET_INVENTORIES_ERROR = createAction('Get all inventories error', props<{error: HttpErrorResponse}>());
export const producersActions = {
    GET_INVENTORIES,
    GET_INVENTORIES_SUCCEEDED,
    GET_INVENTORIES_ERROR
}