import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ProducerInterface } from '../models';

const GET_PRODUCERS = createAction('Get all producers');
const GET_PRODUCERS_SUCCEEDED = createAction('Get all producers succeeded', props<{producers: ProducerInterface[]}>());
const GET_PRODUCERS_ERROR = createAction('Get all producers error', props<{error: HttpErrorResponse}>());
export const producersActions = {
    GET_PRODUCERS,
    GET_PRODUCERS_SUCCEEDED,
    GET_PRODUCERS_ERROR
}