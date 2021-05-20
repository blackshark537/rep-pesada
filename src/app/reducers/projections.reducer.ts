import { createReducer, on } from '@ngrx/store';
import { projectionsActions } from '../actions'
import { LotProjection } from '../models';

const initial_state: LotProjection[] = [];

const _projectionsReducer = createReducer(
    initial_state,
    on(projectionsActions.SET_PROJECTIONS, (state, {projections})=> ([...state, ...projections])),
    on(projectionsActions.GET_PROJECTIONS, (state)=> state)
);

export function projectionsReducer(state, actions){
    return _projectionsReducer(state, actions);
}