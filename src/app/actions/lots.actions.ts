import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { LotInterface } from '../models';

const GET_LOTS = createAction('Get all lots');
const GET_LOTS_SUCCEEDED = createAction('Get all lots succeeded', props<{lots: LotInterface[]}>());
const GET_LOTS_ERROR = createAction('Get all lots error', props<{error: HttpErrorResponse}>());
export const LotsActions = {
    GET_LOTS,
    GET_LOTS_SUCCEEDED,
    GET_LOTS_ERROR
}