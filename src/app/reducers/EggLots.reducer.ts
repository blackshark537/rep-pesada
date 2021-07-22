import { createReducer, on } from '@ngrx/store';
import { EggLotInterface } from '../models';
import { eggLotsActions} from '../actions'

const initial_state: EggLotInterface[] = [];

const _egg_lotsReducer = createReducer(
    initial_state,
    on(eggLotsActions.CLR_EGG_LOTS, (state)=> []),
    on(eggLotsActions.GET_EGG_LOTS, (state)=> [...state]),
    on(eggLotsActions.SET_EGG_LOTS, (state, {eggLots})=> ([...state, ...eggLots]))
);

export function egglotsReducer(state, actions){
    return _egg_lotsReducer(state, actions);
}
