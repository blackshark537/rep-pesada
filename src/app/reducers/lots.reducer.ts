import { Action, createReducer, on } from '@ngrx/store';
import { LotsActions } from '../actions'

const initial_state = [];

const _lotsReducer = createReducer(
    initial_state,
    on(LotsActions.GET_LOTS_SUCCEEDED, (state, {lots})=> lots)
);

export function lotsReducer(state, actions){
    return _lotsReducer(state, actions);
}