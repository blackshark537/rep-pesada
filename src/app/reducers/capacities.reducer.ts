import { createReducer, on } from '@ngrx/store';
import { capacitiesActions } from '../actions'
import { CapacityInterface } from '../models';

const initial_state: CapacityInterface[] = [];

const _capacitiesReducer = createReducer(
    initial_state,
    on(capacitiesActions.GET_CAPACITIES_SUCCEEDED, (state, {capacities})=> capacities),
    on(capacitiesActions.GET_CAPACITIES_ERROR, (state, {error})=> {
        return []
    })
);

export function capacitiesReducer(state, actions){
    return _capacitiesReducer(state, actions);
}