import { createAction, props } from '@ngrx/store';
import { LotInterface, LotsResponse } from '../models';

const GET_LOTS = createAction('Get all lots');
const GET_LOTS_SUCCEEDED = createAction('Get all lots succeeded', props<{lots: any[]}>());

export const LotsActions = {
    GET_LOTS,
    GET_LOTS_SUCCEEDED
}