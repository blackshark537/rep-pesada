import { createAction, props } from '@ngrx/store';
import { LotProjection } from '../models';

const GET_PROJECTIONS = createAction('Get all projections');
const SET_PROJECTIONS = createAction('Set all projections', props<{projections: LotProjection[]}>());
export const projectionsActions = {
    GET_PROJECTIONS,
    SET_PROJECTIONS,
}