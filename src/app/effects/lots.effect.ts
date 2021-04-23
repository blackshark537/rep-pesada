import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { LotsActions } from '../actions';
import { LotService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class LotsEffects{

    getLot$ = createEffect(() => this.action$.pipe(
            ofType(LotsActions.GET_LOTS),
            mergeMap(() => this.lotService.getLots().pipe(
                map(lots => LotsActions.GET_LOTS_SUCCEEDED({lots}))
            ))
        )
    );

    constructor(
        private action$: Actions,
        private lotService: LotService
    ){}
}