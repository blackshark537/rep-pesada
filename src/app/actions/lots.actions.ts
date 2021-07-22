import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { LotModel, LotResponse } from '../models';

const GET_LOTS = createAction('Get all lots');
const CLR_LOTS = createAction('Clear all lots');
const GET_LOTS_SUCCEEDED = createAction('Get all lots succeeded', props<{lots: LotModel[]}>());
const GET_LOTS_ERROR = createAction('Get all lots error', props<{error: HttpErrorResponse}>());
export const LotsActions = {
    CLR_LOTS,
    GET_LOTS,
    GET_LOTS_SUCCEEDED,
    GET_LOTS_ERROR
}