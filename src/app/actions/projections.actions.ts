import { createAction, props } from '@ngrx/store';
import { EggLotProjectionInterface, LotProjection } from '../models';

const GET_PROJECTIONS = createAction('Get all projections');
const SET_PROJECTIONS = createAction('Set all projections', props<{projections: LotProjection[]}>());
const GET_EGG_LOTS_PROJECTIONS = createAction('Set all egg lots Projections');
const SET_EGG_LOTS_PROJECTIONS = createAction('Set all egg lots Projections', props<{projections: EggLotProjectionInterface[]}>());
export const projectionsActions = {
    GET_PROJECTIONS,
    SET_PROJECTIONS,
    GET_EGG_LOTS_PROJECTIONS,
    SET_EGG_LOTS_PROJECTIONS
}