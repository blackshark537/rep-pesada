import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { BusinessInterface } from '../models';

const GET_BUSINESSES = createAction('Get all businesses');
const GET_BUSINESSES_SUCCEEDED = createAction('Get all businesses succeeded', props<{businesses: BusinessInterface[]}>());
const GET_BUSINESSES_ERROR = createAction('Get all businesses error', props<{error: HttpErrorResponse}>());
export const businessActions = {
    GET_BUSINESSES,
    GET_BUSINESSES_SUCCEEDED,
    GET_BUSINESSES_ERROR
}