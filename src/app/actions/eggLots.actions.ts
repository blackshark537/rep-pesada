import { createAction, props } from '@ngrx/store';
import { EggLotInterface, EggLotProjectionInterface } from '../models';

const GET_EGG_LOTS = createAction('Get all egg lots');
const CLR_EGG_LOTS = createAction('Clear all egg lots');
const SET_EGG_LOTS = createAction('Set all egg lots', props<{eggLots: EggLotInterface[]}>());
export const eggLotsActions = {
    CLR_EGG_LOTS,
    GET_EGG_LOTS,
    SET_EGG_LOTS,
}