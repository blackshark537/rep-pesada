import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap } from "rxjs/operators";
import { capacitiesActions } from '../actions';
import { ApiService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class CapacitiesEffect{

    capacities$ = createEffect(() => this.action$.pipe(
        ofType(capacitiesActions.GET_CAPACITIES),
        mergeMap(() => this.apiService.getCapacities().pipe(
            map(capacities => capacitiesActions.GET_CAPACITIES_SUCCEEDED({capacities}))
        ))
    ))

    constructor(
        private action$: Actions,
        private apiService: ApiService
    ){}
}