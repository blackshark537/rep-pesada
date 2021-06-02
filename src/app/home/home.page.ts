import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Subscription } from 'rxjs';
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

  cols1 = [
    //{prop: 'business',  header:'REPRODUCTORAS LIVIANAS'},
    { prop: 'init', header: 'INDICE AL INICIO DEL DIA' },
    { prop: 'prod', header: 'PROCESO PRODUCTIVO DEL DIA' },
    { prop: 'acc', header: 'BALANCE ACUMULADO' },
    { prop: 'part', header: '% VARIACION DEL MERCADO' }
  ];

  cols2 = [
    { prop: 'init', header: ' PRODUCCION DE HUEVOS' },
  ];

  rows1 = [
    //{ key:'FECHA CON CONTADOR DE TIEMPO' },
    { business: `EMPRESAS CON REPRODUCTORAS LIVINAS`, init: null, icon:'business', color:'primary'},
    { business: `REPRODUCTORAS ASIGNADAS AÑO ${this.current_year}`, init: null, icon:'cube', color:'success'},
    { business: 'TOTAL DE AVES EN RECRIA 0-18 SEMANAS', init: null, icon:'logo-twitter', color:'tertiary'},
    { business: 'TOTAL DE AVES EN PRODUCCION 19-85 SEM.', init: null, icon:'logo-twitter', color:'tertiary'},
    { business: 'POBLACION DE REPRODUCTORAS EN RECRIA Y PRODUCCION', init: null, icon:'logo-twitter', color:'tertiary'},
    //{ business: 'MORTALIDAD EN PROCESO', init: null },
    { business: 'PRODUCCION HUEVOS TOTALES', init: null, icon:'egg', color:'warning'},
    { business: 'PRODUCCION HUEVOS INCUBABLES', init: null, icon:'egg', color:'incub'},
    //{ business: 'HUEVOS INCUBABLES ACUMULADOS DEL MES', init: null },
    //{ business: `INCUBACION DE HUEVOS ASIGNADOS PARA ${this.months[this.current_month].header}`, init: null },
    { business: `TOTAL DE POLLITAS PONEDORAS NACIDAS`, init: null, icon:'logo-twitter', color:'tertiary'},
    //{ business: 'TOTAL DE PRODUCTORES PROGRAMADOS ', init: null },
  ];

  rows2 = [
    { business: 'NUMERO DE PRODUCTORES DEDICADOS A LA PRODUCCION', init: 290, icon:'business', color:'primary'},
    { business: 'TOTAL DE GALLINAS EN RECRIA 0-18 SEMANAS', init: null, icon:'logo-twitter', color:'tertiary'},
    { business: 'TOTAL DE GALLINAS EN PRODUCCION 19-85 SEM.', init: null, icon:'logo-twitter', color:'tertiary'},
    { business: 'POBLACION DE GALLINAS EN RECRIA Y PRODUCCION', init: null, icon:'logo-twitter', color:'tertiary'},
    { business: 'PRODUCCION NACIONAL DE HUEVOS TOTALES', init: null, icon:'egg', color:'incub'},
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

  time=new Date();

  sub$1: Subscription;
  sub$2: Subscription;
  sub$3: Subscription;
  sub$4: Subscription;
  constructor(
    private store: Store<AppModel>
  ) { }

  ngOnInit() {
    //const time2=new Date(this.time.getTime() - (this.time.getHours()*60*60*1000));
    this.sub$1 = interval(1000).subscribe(_=>{ 
      this.time=new Date();
      //let time3 = (this.time.getTime() - time2.getTime())*0.01
      //let disc = this.statusProd.final*time3;
      //this.rows1[3].init = Math.floor(this.statusProd.total - disc);
    });

    this.sub$2 = this.store.select('businesses').subscribe(resp=>{
      let gallinas_asignadas=0;
      resp.forEach(rep=>{
        gallinas_asignadas  +=  parseInt(rep.cant_gallinas_asignadas);
      })
      this.rows1[0].init = resp.length;
      this.rows1[1].init = gallinas_asignadas;
    });

    this.sub$3 = this.store.select('lots').pipe(
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
      const disc = (this.statusProd.total+this.statusRecria.total ) * ((this.statusProd.mort+this.statusRecria.mort)/100);
      this.statusProd.final = ((this.statusProd.total+this.statusRecria.total ) - disc) / (24 * 60*60*1000);

      this.rows1[2].init = this.statusRecria.total;
      this.rows1[3].init = this.statusProd.total;
      this.rows1[4].init = this.statusProd.total+this.statusRecria.total;
      //this.rows1[4].init = (this.statusProd.mort+this.statusRecria.mort).toString()+' %'
      this.rows1[5].init = this.statusProd.eggs;
      this.rows1[6].init = this.statusProd.incub_eggs;
      this.rows1[7].init = this.statusProd.born_eggs;
    });

    this.sub$4 = this.store.select('eggLots').subscribe(lots=>{
      this.rows2[1].init = 0;
      this.rows2[2].init = 0;
      this.rows2[3].init = 0;
      this.rows2[4].init = 0;
      lots.filter(lot => lot.weeks_passed > 0 && lot.weeks_passed < 19).forEach(lot => {
        this.rows2[1].init += lot.cant_gallinas_existentes;
      });
      lots.filter(lot => lot.weeks_passed > 18 && lot.weeks_passed < 85).forEach(lot => {
        this.rows2[2].init += lot.cant_gallinas_existentes;
        this.rows2[4].init += lot.production;
      });
      this.rows2[3].init = this.rows2[1].init + this.rows2[2].init;
    });
  }

  ngOnDestroy(){
    this.sub$1.unsubscribe();
    this.sub$2.unsubscribe();
    this.sub$3.unsubscribe();
  }
}