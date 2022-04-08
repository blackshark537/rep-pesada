import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppModel, EggLotProjectionInterface } from 'src/app/models';


export enum TypeFilter {
  Hvo_Prod = 'huevos_producidos',
  Hvo_Incb = 'huevos_incubables',
  Nacimientos = 'nacimientos',
  Aves = 'aves',
  Nacimientos_Term = 'nacimientos_terminados',
}

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  private typeFilter = 'aves';
  private monthly=[];
  private std = false;
  private estado = 'produccion';
  private rows =[];
  private actual_year = new Date().getFullYear();
  private cols = [
    { prop: 'day', header: 'Día' },
    { prop: 'jan', header: 'Enero' },
    { prop: 'feb', header: 'Febrero' },
    { prop: 'mar', header: 'Marzo' },
    { prop: 'apr', header: 'Abril' },
    { prop: 'may', header: 'Mayo' },
    { prop: 'jun', header: 'Junio' },
    { prop: 'jul', header: 'Julio' },
    { prop: 'ago', header: 'Agosto' },
    { prop: 'sep', header: 'Septiembre' },
    { prop: 'oct', header: 'Octubre' },
    { prop: 'nov', header: 'Noviembre' },
    { prop: 'dec', header: 'Diciembre' },
  ];

  private month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(
    private store: Store<AppModel>,
  ) { }

  getAbuelosData(
    year=this.actual_year, 
    estado=this.estado, 
    filter=this.typeFilter, 
    std=this.std
  ) : Observable<{
    datatable:any[], 
    monthlyBalance: any[],
    year: number,
    estado: string,
    filter: string,
    estandar: boolean
  }>{
    
    let monthly=[];
    let headers = this.cols.filter(x => x.prop != 'day').map(val => val.header);
    return this.store.select('projections').pipe(
      map(pro => {
        let result = pro.filter(p => p.year === year)
        return result;
      }),
      switchMap(resp => {
        this.month.forEach((m, h) => {
          let numero_aves_anual = 0;
          let month = [];
          for (let i = 1; i < 32; i++) {
            let pro = resp.filter(p => p.month === m && p.day === i && p.estado === estado);
            let numero_aves = null;
            let d: Date = null;
            let daysInMonth: Date = null;
            pro.forEach((el, k) => {
              d = new Date(el.dia);
              let mt = d.getMonth() + 1;
              let yr = d.getFullYear();
              daysInMonth = new Date(yr, mt, 0);
              if (k < 595) {
                switch (filter) {
                  case TypeFilter.Aves:
                      if(std){
                        numero_aves += el.numero_de_aves_real;
                        numero_aves_anual += el.numero_de_aves_real;
                      } else {
                        numero_aves += parseInt(el.numero_de_aves);
                        numero_aves_anual += parseInt(el.numero_de_aves);
                      }
                    break;
                  case TypeFilter.Hvo_Prod:
                    if(std){
                      numero_aves += el.prod_huevos_totales_real;
                      numero_aves_anual += el.prod_huevos_totales_real;
                    }else{
                      numero_aves += parseInt(el.prod_huevos_totales);
                      numero_aves_anual += parseInt(el.prod_huevos_totales);
                    }
                    break;
                  case TypeFilter.Hvo_Incb:
                    if(std){
                      numero_aves += el.huevos_incubables_real;
                      numero_aves_anual += el.huevos_incubables_real;
                    }else{
                      numero_aves += parseInt(el.huevos_incubables);
                      numero_aves_anual += parseInt(el.huevos_incubables);
                    }
                    break;
                  case TypeFilter.Nacimientos:
                    if(std){
                      numero_aves += el?.nacimientos_totales_real;
                      numero_aves_anual += el?.nacimientos_totales_real;
                    } else {
                      numero_aves += parseInt(el?.nacimientos_totales);
                      numero_aves_anual += parseInt(el?.nacimientos_totales);
                    }
                    break;
                  default:
                    break;
                }
              }
            });
            //console.log(`${headers[m-1]}: ${i}`, numero_aves)
            month.push(numero_aves);
            if (i >= daysInMonth?.getDate())  continue;
          }
          //console.log(`${headers[m-1]}: `,numero_aves_anual)
          monthly.push({ month: headers[m - 1], data: month, balance: filter === TypeFilter.Aves? Math.floor(numero_aves_anual/31) : numero_aves_anual })
          this.rows = [];
          
          for (let i = 0; i < 31; i++) {
            let obj = {};
            obj['id'] = i;
            obj['day'] = i + 1;
            obj['jan'] = monthly.filter(x => x.month == 'Enero')[0]?.data[i];
            obj['feb'] = monthly.filter(x => x.month == 'Febrero')[0]?.data[i];
            obj['mar'] = monthly.filter(x => x.month == 'Marzo')[0]?.data[i];
            obj['apr'] = monthly.filter(x => x.month == 'Abril')[0]?.data[i];
            obj['may'] = monthly.filter(x => x.month == 'Mayo')[0]?.data[i];
            obj['jun'] = monthly.filter(x => x.month == 'Junio')[0]?.data[i];
            obj['jul'] = monthly.filter(x => x.month == 'Julio')[0]?.data[i];
            obj['ago'] = monthly.filter(x => x.month == 'Agosto')[0]?.data[i];
            obj['sep'] = monthly.filter(x => x.month == 'Septiembre')[0]?.data[i];
            obj['oct'] = monthly.filter(x => x.month == 'Octubre')[0]?.data[i];
            obj['nov'] = monthly.filter(x => x.month == 'Noviembre')[0]?.data[i];
            obj['dec'] = monthly.filter(x => x.month == 'Diciembre')[0]?.data[i];
            this.rows.push(obj);
          }
          this.monthly = [
            { month: 'Enero', balance: monthly.filter(x => x.month == 'Enero')[0]?.balance },
            { month: 'Febrero', balance: monthly.filter(x => x.month == 'Febrero')[0]?.balance },
            { month: 'Marzo', balance: monthly.filter(x => x.month == 'Marzo')[0]?.balance },
            { month: 'Abril', balance: monthly.filter(x => x.month == 'Abril')[0]?.balance },
            { month: 'Mayo', balance: monthly.filter(x => x.month == 'Mayo')[0]?.balance },
            { month: 'Junio', balance: monthly.filter(x => x.month == 'Junio')[0]?.balance },
            { month: 'Julio', balance: monthly.filter(x => x.month == 'Julio')[0]?.balance },
            { month: 'Agosto', balance: monthly.filter(x => x.month == 'Agosto')[0]?.balance },
            { month: 'Septiembre', balance: monthly.filter(x => x.month == 'Septiembre')[0]?.balance },
            { month: 'Octubre', balance: monthly.filter(x => x.month == 'Octubre')[0]?.balance },
            { month: 'Noviembre', balance: monthly.filter(x => x.month == 'Noviembre')[0]?.balance },
            { month: 'Diciembre', balance: monthly.filter(x => x.month == 'Diciembre')[0]?.balance },
          ]
        })
  
        let balanceAnual=0;
          this.monthly.forEach(el=>{
            balanceAnual += el.balance
          });
          if(filter === TypeFilter.Aves){
            this.monthly.push({ month: 'Promedio Año', balance: Math.floor(balanceAnual/12)});
          } else {
            this.monthly.push({ month: 'Total Del Año', balance: Math.floor(balanceAnual)});
          }
  
          return new BehaviorSubject({datatable: this.rows, monthlyBalance: this.monthly, year, estado, filter, estandar: std})
      })
    );
  }

  getReproductorasData(
    year=this.actual_year, 
    estado=this.estado, 
    filter=this.typeFilter, 
    std=this.std
  ) : Observable<{
    datatable:any[], 
    monthlyBalance: any[],
    year: number,
    estado: string,
    filter: string,
    estandar: boolean
  }>{
    let data=[];
    return this.store.select('eggLots').pipe(
      map(response =>{
        response.forEach(lote=>{
          data.push(...lote.projections.filter(p=>p.estado === estado && p.year === year ));
        });
        return data;
      }),
      switchMap(resp=>{
        return this.processData(resp, filter, std, year, estado);
      })
    );
  }

  private processData(projections: EggLotProjectionInterface[], filter: string, std: boolean, year: number, estado: string){
    let headers = this.cols.filter(x => x.prop != 'day').map(val => val.header);
    let monthly = [];
    this.month.forEach((m, h) => {
      let numero_aves_anual = 0;
      let month = [];
      for (let i = 1; i < 32; i++) {
        let pro = projections.filter(p => p.month === m && p.day === i );
        let numero_aves = null;
        let d: Date = null;
        let daysInMonth: Date = null;
        pro.forEach((el, k) => {
          d = new Date(el.dia);
          let mt = d.getMonth() + 1;
          let yr = d.getFullYear();
          daysInMonth = new Date(yr, mt, 0);
          if (k < 462) {
            switch (filter) {
              case TypeFilter.Aves:
                if(std){
                  numero_aves += el.numero_de_aves_real;
                  numero_aves_anual += el.numero_de_aves_real;
                }else{
                  numero_aves += el.numero_de_aves;
                  numero_aves_anual += el.numero_de_aves;
                }
                break;
              case TypeFilter.Hvo_Prod:
                if(std){
                  numero_aves += el.prod_huevos_totales_real;
                  numero_aves_anual += el.prod_huevos_totales_real;
                }else{
                  numero_aves += el.prod_huevos_totales;
                  numero_aves_anual += el.prod_huevos_totales;
                }
                break;
              case TypeFilter.Hvo_Incb:
                if(std){
                  numero_aves += parseInt(el.huevos_incubables_real);
                  numero_aves_anual += parseInt(el.huevos_incubables_real);
                } else {
                  numero_aves += parseInt(el.huevos_incubables);
                  numero_aves_anual += parseInt(el.huevos_incubables);
                }
                break;
              case TypeFilter.Nacimientos:
                if(std){
                  numero_aves += parseInt(el?.nacimientos_totales_real);
                  numero_aves_anual += parseInt(el?.nacimientos_totales_real);
                } else {
                  numero_aves += parseInt(el?.nacimientos_totales);
                  numero_aves_anual += parseInt(el?.nacimientos_totales);
                }
                break;
              case TypeFilter.Nacimientos_Term:
                  if(std){
                    numero_aves += el?.nacimientos_terminados_real;
                    numero_aves_anual += el?.nacimientos_terminados_real;
                  } else {
                    numero_aves += el?.nacimientos_terminados;
                    numero_aves_anual += el?.nacimientos_terminados;
                  }
                break;
              default:
                break;
            }
          }
        });
        //console.log(`${headers[m-1]}: ${i}`, numero_aves)
        month.push(numero_aves);
        if (i >= daysInMonth?.getDate())  continue;
      }
      //console.log(`${headers[m-1]}: `,numero_aves_anual)
      monthly.push({ month: headers[m - 1], data: month, balance: filter === TypeFilter.Aves? Math.floor(numero_aves_anual/month.length-1) : numero_aves_anual})
      this.rows = [];
      for (let i = 0; i < 31; i++) {
        let obj = {};
        obj['id'] = i;
        obj['day'] = i + 1;
        obj['jan'] = monthly.filter(x => x.month == 'Enero')[0]?.data[i];
        obj['feb'] = monthly.filter(x => x.month == 'Febrero')[0]?.data[i];
        obj['mar'] = monthly.filter(x => x.month == 'Marzo')[0]?.data[i];
        obj['apr'] = monthly.filter(x => x.month == 'Abril')[0]?.data[i];
        obj['may'] = monthly.filter(x => x.month == 'Mayo')[0]?.data[i];
        obj['jun'] = monthly.filter(x => x.month == 'Junio')[0]?.data[i];
        obj['jul'] = monthly.filter(x => x.month == 'Julio')[0]?.data[i];
        obj['ago'] = monthly.filter(x => x.month == 'Agosto')[0]?.data[i];
        obj['sep'] = monthly.filter(x => x.month == 'Septiembre')[0]?.data[i];
        obj['oct'] = monthly.filter(x => x.month == 'Octubre')[0]?.data[i];
        obj['nov'] = monthly.filter(x => x.month == 'Noviembre')[0]?.data[i];
        obj['dec'] = monthly.filter(x => x.month == 'Diciembre')[0]?.data[i];
        this.rows.push(obj);
      }
      this.monthly = [
        { month: 'Enero', balance: monthly.filter(x => x.month == 'Enero')[0]?.balance },
        { month: 'Febrero', balance: monthly.filter(x => x.month == 'Febrero')[0]?.balance },
        { month: 'Marzo', balance: monthly.filter(x => x.month == 'Marzo')[0]?.balance },
        { month: 'Abril', balance: monthly.filter(x => x.month == 'Abril')[0]?.balance },
        { month: 'Mayo', balance: monthly.filter(x => x.month == 'Mayo')[0]?.balance },
        { month: 'Junio', balance: monthly.filter(x => x.month == 'Junio')[0]?.balance },
        { month: 'Julio', balance: monthly.filter(x => x.month == 'Julio')[0]?.balance },
        { month: 'Agosto', balance: monthly.filter(x => x.month == 'Agosto')[0]?.balance },
        { month: 'Septiembre', balance: monthly.filter(x => x.month == 'Septiembre')[0]?.balance },
        { month: 'Octubre', balance: monthly.filter(x => x.month == 'Octubre')[0]?.balance },
        { month: 'Noviembre', balance: monthly.filter(x => x.month == 'Noviembre')[0]?.balance },
        { month: 'Diciembre', balance: monthly.filter(x => x.month == 'Diciembre')[0]?.balance },
      ]

    })
    let balanceAnual=0;
    this.monthly.forEach(el=>{
      balanceAnual += el.balance
    });
    if(filter === TypeFilter.Aves){
      this.monthly.push({ month: 'Promedio Año', balance: Math.floor(balanceAnual/12)});
    } else {
      this.monthly.push({ month: 'Total Del Año', balance: Math.floor(balanceAnual)});
    }

    return new BehaviorSubject({datatable: this.rows, monthlyBalance: this.monthly, filter, year, estado, estandar: std})
  }

}
