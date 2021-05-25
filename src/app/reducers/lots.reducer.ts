import { createReducer, on } from '@ngrx/store';
import { LotsActions } from '../actions'
import { LotModel, LotResponse } from '../models';

const initial_state: LotModel[] = [];

const _lotsReducer = createReducer(
    initial_state,
    on(LotsActions.GET_LOTS_SUCCEEDED, (state, {lots})=> lots),
    on(LotsActions.GET_LOTS_ERROR, (state, {error})=> {
        return []
    })
);

export function lotsReducer(state, actions){
    return _lotsReducer(state, actions);
}