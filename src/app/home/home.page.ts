import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppModel } from '../models';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{
  current_year = new Date().getFullYear();
  current_month = new Date().getMonth();
  months=[
    //{ prop: 'day', header: 'Día' },
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
  cols = [];
  rows = [];

  cols1 = [
    //{prop: 'business',  header:'REPRODUCTORAS LIVIANAS'},
    { prop: 'init', header: 'INDICE AL INICIO DEL DIA' },
    { prop: 'prod', header: 'PROCESO PRODUCTIVO DEL DIA' },
    { prop: 'acc', header: 'BALANCE ACUMULADO' },
    { prop: 'part', header: '% VARIACION DEL MERCADO' }
  ];

  cols2 = [
    { prop: 'prod', header: ' PRODUCCION DE HUEVOS' },
    { prop: 'elements', header: 'ELEMENTOS' },
  ];

  rows1 = [
    //{ key:'FECHA CON CONTADOR DE TIEMPO' },
    { business: `No. DE EMPRESAS DEDICADAS A LA CRIA DE REPROD. L`, init: null},
    //{ business: `REPRODUCTORAS ASIGNADAS AÑO ${this.current_year}`, init: null},
    { business: 'TOTAL DE AVES EN RECRIA 0-18 SEMANAS', init: null},
    { business: 'TOTAL DE AVES EN PRODUCCION 19-85 SEM.', init: null },
    { business: 'POBLACION  DE REPRODUCTORAS', init: null },
    { business: 'MORTALIDAD EN PROCESO', init: null },
    { business: 'PRODUCCION DE HUEVOS TOTALES EN PROCESO', init: null },
    { business: 'HUEVOS INCUBABLES EN PROCESO PROD.DIA', init: null },
    //{ business: 'HUEVOS INCUBABLES ACUMULADOS DEL MES', init: null },
    //{ business: `INCUBACION DE HUEVOS ASIGNADOS PARA ${this.months[this.current_month].header}`, init: null },
    //{ business: `TOTAL DE POLLITAS PROYECTADAS A NACER ${this.months[this.current_month].header}`, init: null },
    //{ business: 'TOTAL DE PRODUCTORES PROGRAMADOS ', init: null },
  ];

  rows2 = [
    { prod: 'NUMERO DE PRODUCTORES DEDICADOS A LA PRODUCCION', elements: 290 }
  ];

  statusRecria={
    total:0,
    eggs:0,
    incub_eggs:0,
    born_eggs:0,
    mort:0
  }

  statusProd={
    total:0,
    eggs:0,
    incub_eggs:0,
    born_eggs:0,
    mort:0,
    final:0
  }

  sub$1: Subscription;
  sub$2: Subscription;
  constructor(
    private store: Store<AppModel>
  ) { }

  ngOnInit() {
    this.cols = [...this.cols1];
    this.sub$1 = this.store.select('businesses').subscribe(resp=>{
      this.rows1[0].init  = resp.length;
    });

    this.sub$2 = this.store.select('lots').pipe(
      map(a => {
        this.statusRecria={
          total:0,
          eggs:0,
          incub_eggs:0,
          born_eggs:0,
          mort:0
        }
        this.statusProd={
          total:0,
          eggs:0,
          incub_eggs:0,
          born_eggs:0,
          mort:0,
          final:0
        }
        return a.filter(l => l.days >0 && l.days < 595);
      }),
      map(lots => {
        lots.forEach(lot=>{
          if(lot.status === 'breeding'){
            this.statusRecria.total+= lot.total;
            this.statusRecria.eggs+=lot.production;
            this.statusRecria.mort+=lot.recibidas/lot.females;
            this.statusRecria.incub_eggs+=lot.incubables;
            this.statusRecria.born_eggs+=lot.nacimientos;
          } else {
            this.statusProd.total+=  lot.total;
            this.statusProd.eggs+=lot.production;
            this.statusProd.mort+=lot.recibidas/lot.females;
            this.statusProd.incub_eggs+=lot.incubables;
            this.statusProd.born_eggs+=lot.nacimientos;
          }
          
        });
        return lots;
      })
    ).subscribe(resp=>{
      this.rows1[1].init = this.statusRecria.total
      this.rows1[2].init = this.statusProd.total
      this.rows1[3].init = this.statusProd.total+this.statusRecria.total
      this.rows1[4].init = (this.statusProd.mort+this.statusRecria.mort).toString()+' %'
      this.rows1[5].init = this.statusProd.eggs
      this.rows1[6].init = this.statusProd.incub_eggs
    })

    this.rows = [...this.rows1];
  }

  ngOnDestroy(){
    this.sub$1.unsubscribe();
    this.sub$2.unsubscribe();
  }
}