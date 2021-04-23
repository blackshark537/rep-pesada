import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap } from "rxjs/operators";
import { producersActions } from '../actions';
import { ApiService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class ProducerEffect{

    producer$ = createEffect(() => this.action$.pipe(
        ofType(producersActions.GET_PRODUCERS),
        mergeMap(() => this.apiService.getProducers().pipe(
            map(producers => producersActions.GET_PRODUCERS_SUCCEEDED({producers}))
        ))
    ))

    constructor(
        private action$: Actions,
        private apiService: ApiService
    ){}
}