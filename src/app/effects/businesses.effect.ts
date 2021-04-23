import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap } from "rxjs/operators";
import { businessActions } from '../actions';
import { ApiService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class BusinessesEffect{

    businesses$ = createEffect(() => this.action$.pipe(
        ofType(businessActions.GET_BUSINESSES),
        mergeMap(() => this.apiService.getBusinesses().pipe(
            map(businesses => businessActions.GET_BUSINESSES_SUCCEEDED({businesses}))
        ))
    ))

    constructor(
        private action$: Actions,
        private apiService: ApiService
    ){}
}