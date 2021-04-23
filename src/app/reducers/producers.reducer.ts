import { createReducer, on } from '@ngrx/store';
import { producersActions } from '../actions'
import { ProducerInterface } from '../models';

const initial_state: ProducerInterface[] = [];

const _producersReducer = createReducer(
    initial_state,
    on(producersActions.GET_PRODUCERS_SUCCEEDED, (state, {producers})=> producers),
    on(producersActions.GET_PRODUCERS_ERROR, (state, {error})=> {
        return []
    })
);

export function producersReducer(state, actions){
    return _producersReducer(state, actions);
}