import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { finalize, map, mergeMap, tap } from 'rxjs/operators';
import { LotsActions, eggLotsActions, projectionsActions } from '../actions';
import { AppModel, EggLotInterface, EggLotProjectionInterface, LotProjection } from '../models';
import { LotService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class LotsEffects {

    variable_mortalidad_recria = parseInt(localStorage.getItem('variable_mortalidad_recria_pesada')) || 6;
    variable_mortalidad_produccion = parseInt(localStorage.getItem('variable_mortalidad_produccion_pesada')) || 14;
    variable_produccion_huevos_totales = parseInt(localStorage.getItem('variable_produccion_huevos_totales_pesada')) || 0;
    variable_aprovechamiento_huevos = parseInt(localStorage.getItem('variable_aprovechamiento_huevos_pesada')) || 12;
    variable_nacimientos = parseInt(localStorage.getItem('variable_nacimientos_pesada')) || 10;
    semanas_en_recria = 24;
    semanas_en_produccion = 42;
    semanas_de_retardo = 0;

    _PROD = [
        3,20,50,82,85,86,85.8,84.8,83.8,82.8,81.8,80.8,79.8,78.8,77.8,76.7,75.6,74.5,73.3,72.1,70.9,
        69.7,68.5,67.3,66.1,64.9,63.6,62.3,61,59.6,58.2,56.8,55.4,54,52.5,51,49.5,47.9,46.3,44.7,43.1,
        42,41,40,39.5,38.5,37.5,36.5,35.5,34.5,33.6
    ];

    _APROV = [
        0,50,75,80,92,95,96,96.5,97.5,97.5,97.5,97.8,97.8,97.8,97.8,97.8,97.8,97,97,97,97,97,97,97,97,97,97,
        97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,
        97,97,97,97,97,97,97,97,97,97,97,97,96,96,96,96,96
    ];

    _Nac = [
        0,72,77.2,80,82.1,83.8,85.2,86.4,87.5,88.5,89.4,90,90,89.9,89.7,89.5,89.3,89,88.7,88.4,88.1,87.7,87.3,
        86.9,86.5,86.1,85.6,85.1,84.6,84.1,83.6,83.1,82.6,82,81.5,81,80.6,80.1,79.7,79.2,78.7,78.3,77.8,76.8,
        75.8,74.8,73.8,72.8,71.8,70.8,69.8,68.8,67.8,66.8,65.8,64.8,63.8,62.8,61.8,60.8,59,58,57,56,55,54,53,52,
        51,50,49,48,47,46,45,44
    ];

    public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    public date = new Date();
    public years = [ this.date.getFullYear() - 2,this.date.getFullYear() - 1, this.date.getFullYear(), this.date.getFullYear() + 1]

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
        this.variable_mortalidad_recria = parseInt(localStorage.getItem('variable_mortalidad_recria_pesada')) || 6;
        this.variable_mortalidad_produccion = parseInt(localStorage.getItem('variable_mortalidad_produccion_pesada')) || 14;
        this.variable_produccion_huevos_totales = parseInt(localStorage.getItem('variable_produccion_huevos_totales_pesada')) || 5;
        this.variable_aprovechamiento_huevos = parseInt(localStorage.getItem('variable_aprovechamiento_huevos_pesada')) || 12;
        this.variable_nacimientos = parseInt(localStorage.getItem('variable_nacimientos_pesada')) || 10;
        
        this.store.select('projections').pipe(
            map(pro => {
                return pro.filter(p => p.year >= this.years[0])
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

                        if (k < 476) {
                            numero_nac += parseInt(el.nacimientos_totales);
                            numero_nac_anual += parseInt(el.nacimientos_totales);
                        }
                    });
                    //console.log(`${m}: ${i}`, numero_aves)
                    month.push({ year: d?.getFullYear(), month: d?.getMonth() + 1, date: d?.getDate(), day: d?.getDay(), numero_nac, numero_nac_anual });
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
        
        //console.log(monthly[23]);

        monthly.forEach((el, i)=> {
            if (el.day > 1 && el.day < 6) {
                acc_l = null;
                if (el.day < 5) acc_v += el?.numero_nac;
                if (el.day === 5){
                    let lot = {
                        date: new Date(`${el.month}/${el.date}/${el.year}`),
                        year: el?.year,
                        day: el.date,
                        month:  el?.month,
                        dia: el?.day,
                        day_name: 'viernes',
                        cant_gallinas_proyectadas: acc_v,
                        variable_mortalidad_recria: this.variable_mortalidad_recria,
                        variable_mortalidad_produccion: this.variable_mortalidad_produccion,
                        variable_produccion_huevos_totales: this.variable_produccion_huevos_totales,
                    }

                    let recria = this.getRecria(lot);
                    let production = this.getProd(recria[recria.length-1]);
                    const id= this.genId();
                    let lote={
                        id,
                        ...lot,
                        days: this.lotService.daysBetween(lot.date,new Date(Date.now())),
                        recria: [...recria],
                        produccion: [...production]
                    }
                    
                    let projections = this.genProjection(lote);

                    const final={
                        id,
                        ...lot,
                        days_passed: this.lotService.daysBetween(lot.date, new Date()),
                        weeks_passed: this.lotService.weeksBetween(lot.date, new Date()),
                        projections,
                        production: projections[lote.days]?.prod_huevos_totales,
                        cant_gallinas_existentes: projections[lote.days]?.numero_de_aves,
                        numero_huevos_incubables: projections[lote.days]?.huevos_incubables,
                        numero_nacimientos: projections[lote.days]?.nacimientos_totales,
                        nacimientos_terminados: projections[lote.days]?.nacimientos_terminados,
                        estado: lote.days > 168 ? 'produccion' : 'recria',//projections[lote.days]?.estado
                    } as EggLotInterface;
                    data_v.push(final);
                }
            }

            if (el?.day > 4 || el?.day < 2) {
                acc_v = null;
                acc_l += el?.numero_nac;
                if (el.day === 1){
                    const lot = {
                        date: new Date(`${el.month}/${el.date}/${el.year}`),
                        year: el?.year,
                        day: el?.date,
                        dia: el?.day,
                        month:  el?.month,
                        day_name: 'lunes',
                        cant_gallinas_proyectadas: acc_l,
                        variable_mortalidad_recria: 6,
                        variable_mortalidad_produccion: 13,
                        variable_produccion_huevos_totales: 12,
                    }
                    let recria = this.getRecria(lot);
                    let production = this.getProd(recria[recria.length-1]);
                    const id= this.genId();
                    let lote={
                        id,
                        ...lot,
                        days: this.lotService.daysBetween(lot.date,new Date()),
                        recria: [...recria],
                        produccion: [...production]
                    }
                    
                    let projections = this.genProjection(lote);

                    const final={
                        id,
                        ...lot,
                        days_passed: this.lotService.daysBetween(lot.date,new Date()),
                        weeks_passed: this.lotService.weeksBetween(lot.date, new Date()),
                        projections,
                        production: projections[lote.days]?.prod_huevos_totales,
                        cant_gallinas_existentes: projections[lote.days]?.numero_de_aves,
                        numero_huevos_incubables: projections[lote.days]?.huevos_incubables,
                        numero_nacimientos: projections[lote.days]?.nacimientos_totales,
                        nacimientos_terminados: projections[lote.days]?.nacimientos_terminados,
                        estado: lote.days > 168 ? 'produccion' : 'recria'
                    } as EggLotInterface;
                    data_l.push(final);
                }
            }
        });
        let rows = [...data_v, ...data_l]
        rows.forEach((row, i) => {
            row.id = i + 1;
        });
        this.store.dispatch(eggLotsActions.SET_EGG_LOTS({ eggLots: [...rows] }));
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
private getRecria(lote: EggLotInterface) {
    let recria = [];
    let index = 0;
    const total_weeks = 24;
    for (let i = 0; i < total_weeks * 7; i++) {
  
        if (i % 7 === 0) index += 1;
  
        const { 
            variable_mortalidad_recria,
            variable_mortalidad_produccion, 
            date, cant_gallinas_proyectadas ,
            variable_produccion_huevos_totales,
        } = lote;
  
        const percent = recria[i - 1]?.mort || 100;
        const mortality = percent - (variable_mortalidad_recria / (total_weeks * 7));
        let d = new Date(date);
        const date1 = new Date(d?.getTime() + (1 * 24 * 60 * 60 * 1000))
        const date2 = new Date(d?.getTime() + ((i * 24 * 60 * 60 * 1000)));
  
        recria.push({
            id: i,
            day: this.lotService.daysBetween(date1, date2) + i,//day:i+1,
            weekAge: index,
            mort: Math.round(mortality * 100) / 100,
            variable_mortalidad_produccion,
            standar: 0,
            stdreal: 0,
            hincub: 0,
            prodhtotal: 0, //total eggs
            variable_produccion_huevos_totales,
            entry: date2,
            chicks: Math.round(cant_gallinas_proyectadas - ((100 - mortality) * 10)),
        });
    }
    return recria;
  }
  
   private getProd(lote) {
    let prod = [];
    let index = 0;
    const total_weeks = 42;
    
    for (let i = 0; i < total_weeks * 7; i++) {
  
        if (i % 7 === 0) index += 1;
  
        const { day, entry, chicks, variable_mortalidad_produccion, variable_produccion_huevos_totales } = lote;
  
        const percent = prod[i - 1]?.mort || 100;
        const mortality = percent - (variable_mortalidad_produccion / (total_weeks * 7));

        const std_produccion =  this._PROD[index] - (this._PROD[index] * variable_produccion_huevos_totales / 100);
        const std_aprovechamiento = this._APROV[index] - (this._APROV[index] * this.variable_aprovechamiento_huevos /100);
        const std_nacimientos = this._Nac[index] - (this._Nac[index] *  this.variable_nacimientos / 100 );

        const total_chicks = Math.round(chicks - ((100 - mortality) * 10));
        const produccion = total_chicks * (std_produccion*0.01);
        const aprovechamiento = produccion * (std_aprovechamiento*0.01);
        const nacimientos = aprovechamiento * (std_nacimientos*0.01);

        const date2 = new Date(entry?.getTime() + ((1 * 24 * 60 * 60 * 1000) * (i + 1)));

        if (i < (this.semanas_de_retardo * 7)) {
            prod.push({
                id: i,
                weekAge: index,
                day: lote.day + i + 1,//add 1 day
                dayIndx: day,
                mort: Math.round(mortality * 100) / 100,
                entry: date2,
                standar: this._PROD[index],
                chicks: Math.round(chicks - ((100 - mortality) * 10)),
                stdreal: 0,
                std_aprovechamiento,
                hincub: 0,
                prodhtotal: 0, //total eggs
                birth: 0,
                birthtotal: 0,
                birthFinish: 0
            });
        } else {
            prod.push({
                id: i,
                weekAge: index,
                day: lote.day + i + 1,//add 1 day
                dayIndx: day,
                mort: Math.round(mortality * 100) / 100,
                entry: date2,
                stdreal: this._PROD[index],
                standar: std_produccion.toFixed(2),
                std_aprovechamiento: std_aprovechamiento.toFixed(2),
                birth: std_nacimientos.toFixed(2),
                chicks: total_chicks,
                prodhtotal: Math.round(produccion),
                hincub: Math.round(aprovechamiento),
                birthtotal: Math.round(nacimientos),
                birthFinish: this.get_Nac_projection(nacimientos),
            });
        }
  
    }
    return prod;
  }

  private get_Nac_projection(nac_totales: number){
    let prod=[];
    let dias_totales=40;
    //const variable_mortalidad=10;

    for (let i = 0; i < dias_totales; i++) {
        const percent = prod[i - 1]?.mort || 100;
        const mortality = percent - (this.variable_nacimientos / dias_totales);
        prod.push({
            mort: Math.round(mortality * 100) / 100,
            chicks: Math.round(nac_totales - ((100 - mortality) * this.variable_nacimientos)),
        });
    }
    return prod[prod.length-1].chicks;
    //return Math.floor(nac_totales - (nac_totales * 10 /100))
  }

  private genProjection(lot): EggLotProjectionInterface[] {
    let dt:EggLotProjectionInterface[] = [];
    lot.recria.forEach(recria => {
        let projection = {
            id: lot.id,
            age: recria.weekAge,
            dia: recria.entry,
            estado: 'recria',
            mortalidad: recria.mort,
            std_produccion: recria.standar,
            estandar_real: recria.standar,
            year: recria.entry.getFullYear(),
            month: recria.entry.getMonth() + 1,
            day: recria.entry.getDate(),
            prod_huevos_totales: recria.prodhtotal,
            numero_de_aves: recria.chicks,
            aprovechamiento_de_huevos_estandar: '0',
            huevos_incubables: '0',
            estandar_de_nacimientos: '0',
            nacimientos_totales:  '0',
            nacimientos_terminados: 0
        } as EggLotProjectionInterface;
        dt.push(projection)
    });
    lot.produccion.forEach(production => {
        let projection = {
            id: lot.id,
            age: production.weekAge+24,
            dia: production.entry,
            estado: 'produccion',
            mortalidad: production.mort,
            std_produccion: production.standar,
            estandar_real: production.standar,
            year: production.entry.getFullYear(),
            month: production.entry.getMonth() + 1,
            day: production.entry.getDate(),
            prod_huevos_totales: production.prodhtotal,
            numero_de_aves: production.chicks,
            aprovechamiento_de_huevos_estandar: production.std_aprovechamiento,
            huevos_incubables: production.hincub,
            estandar_de_nacimientos: production.birth,
            nacimientos_totales:  production.birthtotal,
            nacimientos_terminados: production.birthFinish
        } as EggLotProjectionInterface;
        dt.push(projection)
    });
    return dt;
  }


  genId(): string{
    const qwerty='ABCDEFGHIJKLMNOPQRSTUVYWZ0123456789abcdefghijklmnopqrstuvyz_'
    let id='';
    for (let i = 0; i < 10; i++) {
        id += qwerty[Math.floor(Math.random()*qwerty.length-1)];
    }
    return id;
  }
}