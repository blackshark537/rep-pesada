import { createReducer, on } from '@ngrx/store';
import { Actions } from '@ngrx/store-devtools/src/reducer';
import { projectionsActions } from '../actions'
import { EggLotProjectionInterface, LotProjection } from '../models';

const initial_state: LotProjection[] = [];
const Egg_state:    EggLotProjectionInterface[] = [];

const _projectionsReducer = createReducer(
    initial_state,
    on(projectionsActions.SET_PROJECTIONS, (state, {projections})=> ([...state, ...projections])),
    on(projectionsActions.GET_PROJECTIONS, (state)=> state),
);

const _eggsProjectionsReducer = createReducer(
    Egg_state,
    on(projectionsActions.SET_EGG_LOTS_PROJECTIONS, (state, {projections})=> ([...state, ...projections])),
    on(projectionsActions.GET_EGG_LOTS_PROJECTIONS, (state)=> state),
);

export function projectionsReducer(state: LotProjection[], actions: Actions){
    return _projectionsReducer(state, actions);
}

export function eggProjectionsReducer(state: EggLotProjectionInterface[], actions: Actions){
    return _eggsProjectionsReducer(state, actions);
}