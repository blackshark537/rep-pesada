import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { finalize, map, mergeMap, tap } from 'rxjs/operators';
import { LotsActions, eggLotsActions } from '../actions';
import { AppModel, EggLotInterface, LotProjection } from '../models';
import { LotService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class LotsEffects {

    public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    public date = new Date();
    public years = [this.date.getFullYear() - 1, this.date.getFullYear(), this.date.getFullYear() + 1]

    getLot$ = createEffect(() => this.action$.pipe(
        ofType(LotsActions.GET_LOTS),
        mergeMap(() => this.lotService.getLots().pipe(
            map(lots => LotsActions.GET_LOTS_SUCCEEDED({ lots })),
            finalize(() => this.getEggsLots())
        )
        )
    )
    );

    constructor(
        private action$: Actions,
        private store: Store<AppModel>,
        private lotService: LotService
    ) { }

    getEggsLots() {
        this.store.select('projections').pipe(
            map(pro => {
                return pro.filter(p => p.year >= this.years[0] - 1)
            })
        ).subscribe(resp => {
            if (!!resp) this.formatData(resp);
        });
    }

    formatData(resp) {
        let monthly = [];
        this.years.forEach((val, y) => {
            let numero_nac_anual = 0;
            this.months.forEach(m => {
                let month = [];
                for (let i = 1; i < 32; i++) {
                    let pro = resp.filter(p => p.year === val && p.month === m && p.day === i);
                    let numero_nac = 0;
                    let d: Date = null;
                    let daysInMonth: Date = null;

                    pro.forEach((pro, k) => {
                        const el = pro as LotProjection
                        d = new Date(el.dia);
                        let mt = d.getMonth() + 1;
                        let yr = d.getFullYear();
                        daysInMonth = new Date(yr, mt, 0);

                        if (k < 595) {
                            numero_nac += parseInt(el.nacimientos_totales);
                            numero_nac_anual += parseInt(el.nacimientos_totales);
                        }
                    });
                    //console.log(`${m}: ${i}`, numero_aves)
                    month.push({ year: d?.getFullYear(), month: d?.getMonth() + 1, date: d?.getDate(), day: d?.getDay(), numero_nac });
                    if (i >= daysInMonth?.getDate()) continue;
                }
                if (!!m) monthly.push(...month);
            });
            /* console.log(`${val}: `,numero_nac_anual) */
        });
        this.generateData(monthly);
    }

    async generateData(monthly: any[]) {
        let data_l: EggLotInterface[] = [];
        let data_v: EggLotInterface[] = [];
        let acc_l = null;
        let acc_v = null;

        monthly.forEach(el => {
            if (el.day > 1 && el.day < 6) {
                acc_l = null;
                if (el.day < 5) acc_v += el?.numero_nac;
                if (el.day === 5) data_v.push({
                    date: `${el.date}/${el.month}/${el.year}`,
                    year: el?.year,
                    day: el.day,
                    day_name: 'viernes',
                    cant_gallinas_proyectadas: acc_v,
                    cant_gallinas_reales: 0,
                    variable_mortalidad_recria: 5,
                    variable_mortalidad_produccion: 10,
                    variable_produccion_huevos_totales: 2
                });
            }

            if (el?.day > 4 || el?.day < 2) {
                acc_v = null;
                acc_l += el?.numero_nac;
                if (el.day === 1) data_l.push({
                    date: `${el.date}/${el.month}/${el.year}`,
                    year: el?.year,
                    day: el.day,
                    day_name: 'lunes',
                    cant_gallinas_proyectadas: acc_l,
                    cant_gallinas_reales: 0,
                    variable_mortalidad_recria: 5,
                    variable_mortalidad_produccion: 10,
                    variable_produccion_huevos_totales: 2
                });
            }
        });

        this.store.dispatch(eggLotsActions.SET_EGG_LOTS({ eggLots: [...data_v, ...data_l] }));
    }
}