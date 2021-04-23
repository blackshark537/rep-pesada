import { createReducer, on } from '@ngrx/store';
import { businessActions } from '../actions'
import { BusinessInterface } from '../models';

const initial_state: BusinessInterface[] = [];

const _businessesReducer = createReducer(
    initial_state,
    on(businessActions.GET_BUSINESSES_SUCCEEDED, (state, {businesses})=> businesses),
    on(businessActions.GET_BUSINESSES_ERROR, (state, {error})=> {
        return []
    })
);

export function businessesReducer(state, actions){
    return _businessesReducer(state, actions);
}