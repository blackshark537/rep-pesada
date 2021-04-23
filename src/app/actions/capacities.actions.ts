import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CapacityInterface } from '../models';

const GET_CAPACITIES = createAction('Get all capacities');
const GET_CAPACITIES_SUCCEEDED = createAction('Get all capacities succeeded', props<{capacities: CapacityInterface[]}>());
const GET_CAPACITIES_ERROR = createAction('Get all capacities error', props<{error: HttpErrorResponse}>());
export const capacitiesActions = {
    GET_CAPACITIES,
    GET_CAPACITIES_SUCCEEDED,
    GET_CAPACITIES_ERROR
}