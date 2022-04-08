import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { from, interval, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppModel } from '../models';
import Speech from 'speak-tts';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DatatableService, LotService, TypeFilter } from '../services';
import { LotsEffects } from '../effects';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{
  current_year = new Date().getFullYear();
  current_month = new Date().getMonth()+1;

  selected="day";
  months=[
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

  speak = null;
  speaking=false;
  onPause = false;
  rows1 = [
    { business: `Empresas Genéticas`, init: null, init_real: null, init_diff: null, month: null, month_real: null, month_diff: null, year: null, year_real: null, year_diff: null, icon:'business', color:'primary'},
    { business: `Progenitores Abuelos Importados Año ${this.transform(this.current_year)}`, init: null, init_real: null, init_diff: null, month: null, month_real: null, month_diff: null, year: null, year_real: null, year_diff: null, icon:'airplane', color:'warning'},
    { business: 'Población de Aves en Recría 0 a 24 Semanas', init: null, init_real: null, init_diff: null, month: null, month_real: null, month_diff: null, year: null, year_real: null, year_diff: null, icon:'female', color:'tertiary'},
    { business: 'Población de Aves en Producción 25 a 66 Semanas', init: null, init_real: null, init_diff: null, month: null, month_real: null, month_diff: null, year: null, year_real: null, year_diff: null, icon:'female', color:'tertiary'},
    { business: 'Población Total de Aves en Recría y Producción', init: null, init_real: null, init_diff: null, month: null, month_real: null, year: null, year_real: null, year_diff: null, month_diff: null, icon:'female', color:'tertiary'},
    { business: 'Total de Huevos Producidos', init: null, init_real: null, init_diff: null, month: null, month_real: null, year: null, year_real: null, year_diff: null, icon:'egg', color:'warning'},
    { business: 'Total de Huevos Incubables', init: null, init_real: null, init_diff: null, month: null, month_real: null, month_diff: null, year: null, year_real: null, year_diff: null, icon:'egg', color:'incub'},
    { business: `Total de Pollitas Reproductoras Nacidas`, init: null, init_real: null, init_diff: null, month: null, month_real: null, month_diff: null, year: null, year_real: null, year_diff: null, icon:'female', color:'tertiary'},
  ];

  rows2 = [
    { business: 'Empresas Dedicadas a la Crianza de Reproductoras', init: 32, init_real: 32, init_diff: 0, month: 32, month_real: 32, month_diff: 0, year: 32, year_real: 32, year_diff: 0, icon:'business', color:'primary'},
    { business: 'Población de Reproductoras en Recría 0 a 24 Semanas', init: null, init_real: null, init_diff: null, month: null, month_real: null, month_diff: null, year: null, year_real: null, year_diff: null, icon:'female', color:'tertiary'},
    { business: 'Población de Reproductoras En Producción 24 a 66 Semanas.', init: null, init_real: null, init_diff: null, month: null, month_real: null, month_diff: null, year: null, year_real: null, year_diff: null, icon:'female', color:'tertiary'},
    { business: 'Población de Reproductoras Pesadas en Recría y Producción', init: null, init_real: null, init_diff: null, month: null, month_real: null, month_diff: null, year: null, year_real: null, year_diff: null, icon:'female', color:'tertiary'},
    { business: 'Producción Nacional De Huevos Totales', init: null, init_real: null, init_diff: null, month: null, month_real: null, month_diff: null, year: null, year_real: null, year_diff: null, icon:'egg', color:'incub'},
    { business: 'Producción Nacional De Huevos Fertiles', init: null, init_real: null, init_diff: null, month: null, month_real: null, month_diff: null, year: null, year_real: null, year_diff: null, icon:'egg', color:'incub'},
    { business: `Producción Nacional De Pollitos Nacidos`, init: null, init_real: null, init_diff: null, month: null, month_real: null, month_diff: null, year: null, year_real: null, year_diff: null, icon:'female', color:'tertiary'},
    { business: `Producción Nacional De Pollos Terminados`, init: null, init_real: null, init_diff: null, month: null, month_real: null, month_diff: null, year: null, year_real: null, year_diff: null, icon:'female', color:'tertiary'},
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
    incub_eggs_real:0,
    born_eggs_real:0,
    mort:0,
    final:0
  }

  time=new Date();

  month = [this.current_month];

  semanasAbuelas = 24;
  semanasReproductoras = 24;

  sub$1: Subscription;
  sub$2: Subscription;
  sub$3: Subscription;
  sub$4: Subscription;
  sub$5: Subscription;
  view:string='abuelos';
  //Speach
  speech: Speech = new Speech();
  gallinas_importadas=0;

  constructor(
    private store: Store<AppModel>,
    private _ar: ActivatedRoute,
    private loadCtrl: LoadingController,
    private loteService: LotService,
    private effetService: LotsEffects,
    private datatableService: DatatableService
  ) { 
    if(!this.speech) this.speech = new Speech();
  }

  ngOnInit() {
    this.semanasAbuelas = this.loteService.semanas_en_produccion+24;
    this.semanasReproductoras = this.effetService.semanas_en_produccion_real+24;
    this.rows1[3].business =`Población de Aves en Producción 25 a ${this.loteService.semanas_en_produccion+24} Semanas`;
    this.rows2[2].business =`Promedio de Reproductoras Pesadas en Producción 24 a ${this.effetService.semanas_en_produccion_real+24} Semanas`;
    this.view = this._ar.snapshot.paramMap.get('id');
    this.sub$1 = interval(1000).subscribe(_=>{ 
      this.time=new Date();
    });

    if(this.view === 'abuelos' || this.view === 'general'){
    this.sub$2 = this.store.select('businesses').subscribe(resp=>{
      let gallinas_asignadas=0;
      resp.forEach(rep=>{
        gallinas_asignadas += parseInt(rep.cant_gallinas_asignadas);
      });

      this.rows1[0].business += ` ${resp[0].nombre_comercial} y ${resp[1].nombre_comercial}`
      this.rows1[0].init = resp.length;
      this.rows1[0].init_real = resp.length;
      this.rows1[0].init_diff = this.rows1[0].init - this.rows1[0].init_real;

      this.rows1[0].month = resp.length;
      this.rows1[0].month_real = resp.length;
      this.rows1[0].month_diff = this.rows1[0].month - this.rows1[0].month_real;

      this.rows1[0].year = resp.length;
      this.rows1[0].year_real = resp.length;
      this.rows1[0].year_diff = this.rows1[0].year - this.rows1[0].year_real;

      this.rows1[1].init = gallinas_asignadas;
      this.rows1[1].month = gallinas_asignadas;
      this.rows1[1].year = gallinas_asignadas;
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
          incub_eggs_real:0,
          born_eggs_real: 0,
          mort:0,
          final:0
        }
        
        return a.filter(l => l.days >0 && l.days < 462);
      }),
      map(lots => {
        this.gallinas_importadas = 0;
        lots.forEach(lot=>{
          if(lot.year === 2022) this.gallinas_importadas += lot.recibidas;

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
      
      this.rows1[1].init_real = this.gallinas_importadas;
      this.rows1[1].month_real = this.gallinas_importadas;
      this.rows1[1].year_real = this.gallinas_importadas;

      this.rows1[1].init_diff = this.rows1[1].init - this.rows1[1].init_real;
      this.rows1[1].month_diff = this.rows1[1].month - this.rows1[1].month_real;
      this.rows1[1].year_diff = this.rows1[1].month - this.rows1[1].month_real;
    });

    this.sub$4 = from([
      {year: 2022, estado: 'recria', filter: TypeFilter.Aves, estandar: true},
      {year: 2022, estado: 'recria', filter: TypeFilter.Aves, estandar: false},
      {year: 2022, estado: 'produccion', filter: TypeFilter.Aves, estandar: true},
      {year: 2022, estado: 'produccion', filter: TypeFilter.Aves, estandar: false},
      {year: 2022, estado: 'produccion', filter: TypeFilter.Hvo_Prod, estandar: true},
      {year: 2022, estado: 'produccion', filter: TypeFilter.Hvo_Prod, estandar: false},
      {year: 2022, estado: 'produccion', filter: TypeFilter.Hvo_Incb, estandar: true},
      {year: 2022, estado: 'produccion', filter: TypeFilter.Hvo_Incb, estandar: false},
      {year: 2022, estado: 'produccion', filter: TypeFilter.Nacimientos, estandar: true},
      {year: 2022, estado: 'produccion', filter: TypeFilter.Nacimientos, estandar: false}
    ]).pipe(
      switchMap(qwerty=>{
        return this.datatableService.getAbuelosData(qwerty.year, qwerty.estado, qwerty.filter, qwerty.estandar)
      })
    ).subscribe(resp=>{
      const date = new Date();
      const dia = date.getDate();
      const mIndx = date.getMonth();
      const month = this.months[mIndx+1].prop;
//========================================================================================================================
      if(resp.estandar && resp.estado === 'recria' && resp.filter === TypeFilter.Aves){
         this.rows1[2].init = resp.datatable.filter(d=> d.day === dia)[0][month];
         this.rows1[2].month = resp.monthlyBalance[mIndx].balance;
         this.rows1[2].year = resp.monthlyBalance[12].balance;
      };
      if(!resp.estandar && resp.estado === 'recria' && resp.filter === TypeFilter.Aves){
         this.rows1[2].init_real = resp.datatable.filter(d=> d.day === dia)[0][month];
         this.rows1[2].month_real = resp.monthlyBalance[mIndx].balance;
         this.rows1[2].year_real = resp.monthlyBalance[12].balance;
      }
//========================================================================================================================
      if(resp.estandar && resp.estado === 'produccion' && resp.filter === TypeFilter.Aves) {
        this.rows1[3].init = resp.datatable.filter(d=> d.day === dia)[0][month];
        this.rows1[3].month = resp.monthlyBalance[mIndx].balance;
        this.rows1[3].year = resp.monthlyBalance[12].balance;
      }
      if(!resp.estandar && resp.estado === 'produccion' && resp.filter === TypeFilter.Aves){
         this.rows1[3].init_real = resp.datatable.filter(d=> d.day === dia)[0][month];
         this.rows1[3].month_real = resp.monthlyBalance[mIndx].balance;
         this.rows1[3].year_real = resp.monthlyBalance[12].balance;
      }
//========================================================================================================================
    if(resp.estandar && resp.estado === 'produccion' && resp.filter === TypeFilter.Hvo_Prod) {
      this.rows1[5].init = resp.datatable.filter(d=> d.day === dia)[0][month];
      this.rows1[5].month = resp.monthlyBalance[mIndx].balance;
      this.rows1[5].year = resp.monthlyBalance[12].balance;
    }
    if(!resp.estandar && resp.estado === 'produccion' && resp.filter === TypeFilter.Hvo_Prod){
      this.rows1[5].init_real = resp.datatable.filter(d=> d.day === dia)[0][month];
      this.rows1[5].month_real = resp.monthlyBalance[mIndx].balance;
      this.rows1[5].year_real = resp.monthlyBalance[12].balance;
    }
//========================================================================================================================
  if(resp.estandar && resp.estado === 'produccion' && resp.filter === TypeFilter.Hvo_Incb) {
    this.rows1[6].init = resp.datatable.filter(d=> d.day === dia)[0][month];
    this.rows1[6].month = resp.monthlyBalance[mIndx].balance;
    this.rows1[6].year = resp.monthlyBalance[12].balance;
  }
  if(!resp.estandar && resp.estado === 'produccion' && resp.filter === TypeFilter.Hvo_Incb){
    this.rows1[6].init_real = resp.datatable.filter(d=> d.day === dia)[0][month];
    this.rows1[6].month_real = resp.monthlyBalance[mIndx].balance;
    this.rows1[6].year_real = resp.monthlyBalance[12].balance;
  }
//========================================================================================================================
  if(resp.estandar && resp.estado === 'produccion' && resp.filter === TypeFilter.Nacimientos) {
    this.rows1[7].init = resp.datatable.filter(d=> d.day === dia)[0][month];
    this.rows1[7].month = resp.monthlyBalance[mIndx].balance;
    this.rows1[7].year = resp.monthlyBalance[12].balance;
  }
  if(!resp.estandar && resp.estado === 'produccion' && resp.filter === TypeFilter.Nacimientos){
    this.rows1[7].init_real = resp.datatable.filter(d=> d.day === dia)[0][month];
    this.rows1[7].month_real = resp.monthlyBalance[mIndx].balance;
    this.rows1[7].year_real = resp.monthlyBalance[12].balance;
  }
//========================================================================================================================
      this.rows1[2].init_diff = this.rows1[2].init_real - this.rows1[2].init;
      this.rows1[2].month_diff = this.rows1[2].month_real - this.rows1[2].month;
      this.rows1[2].year_diff = (this.rows1[2].year_real - this.rows1[2].year) //* 100 / this.rows1[2].year_real).toFixed(2);

      this.rows1[3].init_diff = this.rows1[3].init_real - this.rows1[3].init;
      this.rows1[3].month_diff = this.rows1[3].month_real - this.rows1[3].month;
      this.rows1[3].year_diff = (this.rows1[3].year_real - this.rows1[3].year) //* 100 / this.rows1[3].year_real).toFixed(2);

      this.rows1[5].init_diff = this.rows1[5].init_real - this.rows1[5].init;
      this.rows1[5].month_diff = this.rows1[5].month_real - this.rows1[5].month;
      this.rows1[5].year_diff = (this.rows1[5].year_real - this.rows1[5].year)// * 100 / this.rows1[5].year_real).toFixed(2);

      this.rows1[6].init_diff = this.rows1[6].init_real - this.rows1[6].init;
      this.rows1[6].month_diff = this.rows1[6].month_real - this.rows1[6].month;
      this.rows1[6].year_diff = (this.rows1[6].year_real - this.rows1[6].year) //* 100 / this.rows1[6].year_real).toFixed(2);

      this.rows1[7].init_diff = this.rows1[7].init_real - this.rows1[7].init;
      this.rows1[7].month_diff = this.rows1[7].month_real - this.rows1[7].month;
      this.rows1[7].year_diff = (this.rows1[7].year_real - this.rows1[7].year) //* 100 / this.rows1[7].year_real).toFixed(2);
//========================================================================================================================
      setTimeout(_=>{
        this.rows1[4].init = this.rows1[3].init + this.rows1[2].init;
        this.rows1[4].init_real = this.rows1[3].init_real + this.rows1[2].init_real;
        this.rows1[4].init_diff = this.rows1[4].init_real - this.rows1[4].init;

        this.rows1[4].month = this.rows1[3].month + this.rows1[2].month;
        this.rows1[4].month_real = this.rows1[3].month_real + this.rows1[2].month_real;
        this.rows1[4].month_diff = this.rows1[4].month_real - this.rows1[4].month;

        this.rows1[4].year = this.rows1[3].year + this.rows1[2].year;
        this.rows1[4].year_real = this.rows1[3].year_real + this.rows1[2].year_real;
        this.rows1[4].year_diff = (this.rows1[4].year_real - this.rows1[4].year) //* 100 / this.rows1[4].year_real).toFixed(2);
      }, 600);
    });
    }

    if(this.view === 'pesadas' || this.view === 'general'){
    this.sub$5 = from([
      {year: 2022, estado: 'recria', filter: TypeFilter.Aves, estandar: true},
      {year: 2022, estado: 'recria', filter: TypeFilter.Aves, estandar: false},
      {year: 2022, estado: 'produccion', filter: TypeFilter.Aves, estandar: true},
      {year: 2022, estado: 'produccion', filter: TypeFilter.Aves, estandar: false},
      {year: 2022, estado: 'produccion', filter: TypeFilter.Hvo_Prod, estandar: true},
      {year: 2022, estado: 'produccion', filter: TypeFilter.Hvo_Prod, estandar: false},
      {year: 2022, estado: 'produccion', filter: TypeFilter.Hvo_Incb, estandar: true},
      {year: 2022, estado: 'produccion', filter: TypeFilter.Hvo_Incb, estandar: false},
      {year: 2022, estado: 'produccion', filter: TypeFilter.Nacimientos, estandar: true},
      {year: 2022, estado: 'produccion', filter: TypeFilter.Nacimientos, estandar: false},
      {year: 2022, estado: 'produccion', filter: TypeFilter.Nacimientos_Term, estandar: true},
      {year: 2022, estado: 'produccion', filter: TypeFilter.Nacimientos_Term, estandar: false}
    ]).pipe(
      switchMap(qwerty=>{
        return this.datatableService.getReproductorasData(qwerty.year, qwerty.estado, qwerty.filter, qwerty.estandar)
      })
    ).subscribe(resp=>{
      const date = new Date();
      const dia = date.getDate();
      const mIndx = date.getMonth();
      const month = this.months[mIndx+1].prop;
//========================================================================================================================
      if(resp.estandar && resp.estado === 'recria' && resp.filter === TypeFilter.Aves){
        this.rows2[1].init = resp.datatable.filter(d=> d.day === dia)[0][month];
        this.rows2[1].month = resp.monthlyBalance[mIndx].balance;
        this.rows2[1].year = resp.monthlyBalance[12].balance;
      };
      if(!resp.estandar && resp.estado === 'recria' && resp.filter === TypeFilter.Aves){
        this.rows2[1].init_real = resp.datatable.filter(d=> d.day === dia)[0][month];
        this.rows2[1].month_real = resp.monthlyBalance[mIndx].balance;
        this.rows2[1].year_real = resp.monthlyBalance[12].balance;
      }
//========================================================================================================================
      if(resp.estandar && resp.estado === 'produccion' && resp.filter === TypeFilter.Aves){
        this.rows2[2].init = resp.datatable.filter(d=> d.day === dia)[0][month];
        this.rows2[2].month = resp.monthlyBalance[mIndx].balance;
        this.rows2[2].year = resp.monthlyBalance[12].balance;
      };
      if(!resp.estandar && resp.estado === 'produccion' && resp.filter === TypeFilter.Aves){
        this.rows2[2].init_real = resp.datatable.filter(d=> d.day === dia)[0][month];
        this.rows2[2].month_real = resp.monthlyBalance[mIndx].balance;
        this.rows2[2].year_real = resp.monthlyBalance[12].balance;
      }
//========================================================================================================================
      if(resp.estandar && resp.estado === 'produccion' && resp.filter === TypeFilter.Hvo_Prod) {
        this.rows2[4].init = resp.datatable.filter(d=> d.day === dia)[0][month];
        this.rows2[4].month = resp.monthlyBalance[mIndx].balance;
        this.rows2[4].year = resp.monthlyBalance[12].balance;
      }
      if(!resp.estandar && resp.estado === 'produccion' && resp.filter === TypeFilter.Hvo_Prod){
        this.rows2[4].init_real = resp.datatable.filter(d=> d.day === dia)[0][month];
        this.rows2[4].month_real = resp.monthlyBalance[mIndx].balance;
        this.rows2[4].year_real = resp.monthlyBalance[12].balance;
      }
//========================================================================================================================
      if(resp.estandar && resp.estado === 'produccion' && resp.filter === TypeFilter.Hvo_Incb) {
        this.rows2[5].init = resp.datatable.filter(d=> d.day === dia)[0][month];
        this.rows2[5].month = resp.monthlyBalance[mIndx].balance;
        this.rows2[5].year = resp.monthlyBalance[12].balance;
      }
      if(!resp.estandar && resp.estado === 'produccion' && resp.filter === TypeFilter.Hvo_Incb){
        this.rows2[5].init_real = resp.datatable.filter(d=> d.day === dia)[0][month];
        this.rows2[5].month_real = resp.monthlyBalance[mIndx].balance;
        this.rows2[5].year_real = resp.monthlyBalance[12].balance;
      }
//========================================================================================================================
      if(resp.estandar && resp.estado === 'produccion' && resp.filter === TypeFilter.Nacimientos) {
        this.rows2[6].init = resp.datatable.filter(d=> d.day === dia)[0][month];
        this.rows2[6].month = resp.monthlyBalance[mIndx].balance;
        this.rows2[6].year = resp.monthlyBalance[12].balance;
      }
      if(!resp.estandar && resp.estado === 'produccion' && resp.filter === TypeFilter.Nacimientos){
        this.rows2[6].init_real = resp.datatable.filter(d=> d.day === dia)[0][month];
        this.rows2[6].month_real = resp.monthlyBalance[mIndx].balance;
        this.rows2[6].year_real = resp.monthlyBalance[12].balance;
      }
//========================================================================================================================
      if(resp.estandar && resp.estado === 'produccion' && resp.filter === TypeFilter.Nacimientos_Term) {
        this.rows2[7].init = resp.datatable.filter(d=> d.day === dia)[0][month];
        this.rows2[7].month = resp.monthlyBalance[mIndx].balance;
        this.rows2[7].year = resp.monthlyBalance[12].balance;
      }
      if(!resp.estandar && resp.estado === 'produccion' && resp.filter === TypeFilter.Nacimientos_Term){
        this.rows2[7].init_real = resp.datatable.filter(d=> d.day === dia)[0][month];
        this.rows2[7].month_real = resp.monthlyBalance[mIndx].balance;
        this.rows2[7].year_real = resp.monthlyBalance[12].balance;
      }
//========================================================================================================================
        this.rows2[1].init_diff = this.rows2[1].init_real - this.rows2[1].init;
        this.rows2[1].month_diff = this.rows2[1].month_real - this.rows2[1].month;
        this.rows2[1].year_diff = (this.rows2[1].year_real - this.rows2[1].year) //* 100 / this.rows1[2].year_real).toFixed(2);

        this.rows2[2].init_diff = this.rows2[2].init_real - this.rows2[2].init;
        this.rows2[2].month_diff = this.rows2[2].month_real - this.rows2[2].month;
        this.rows2[2].year_diff = (this.rows2[2].year_real - this.rows2[2].year) //* 100 / this.rows1[3].year_real).toFixed(2);

        this.rows2[4].init_diff = this.rows2[4].init_real - this.rows2[4].init;
        this.rows2[4].month_diff = this.rows2[4].month_real - this.rows2[4].month;
        this.rows2[4].year_diff = (this.rows2[4].year_real - this.rows2[4].year) //* 100 / this.rows1[3].year_real).toFixed(2);

        this.rows2[5].init_diff = this.rows2[5].init_real - this.rows2[5].init;
        this.rows2[5].month_diff = this.rows2[5].month_real - this.rows2[5].month;
        this.rows2[5].year_diff = (this.rows2[5].year_real - this.rows2[5].year)// * 100 / this.rows1[5].year_real).toFixed(2);

        this.rows2[6].init_diff = this.rows2[6].init_real - this.rows2[6].init;
        this.rows2[6].month_diff = this.rows2[6].month_real - this.rows2[6].month;
        this.rows2[6].year_diff = (this.rows2[6].year_real - this.rows2[6].year) //* 100 / this.rows1[6].year_real).toFixed(2);

        this.rows2[7].init_diff = this.rows2[7].init_real - this.rows2[7].init;
        this.rows2[7].month_diff = this.rows2[7].month_real - this.rows2[7].month;
        this.rows2[7].year_diff = (this.rows2[7].year_real - this.rows2[7].year) //* 100 / this.rows1[7].year_real).toFixed(2);
//========================================================================================================================
        setTimeout(_=>{
          this.rows2[3].init = this.rows2[1].init + this.rows2[2].init;
          this.rows2[3].init_real = this.rows2[1].init_real + this.rows2[2].init_real;
          this.rows2[3].init_diff = this.rows2[3].init_real - this.rows2[3].init;

          this.rows2[3].month = this.rows2[1].month + this.rows2[2].month;
          this.rows2[3].month_real = this.rows2[1].month_real + this.rows2[2].month_real;
          this.rows2[3].month_diff = this.rows2[3].month_real - this.rows2[3].month;

          this.rows2[3].year = this.rows2[1].year + this.rows2[2].year;
          this.rows2[3].year_real = this.rows2[1].year_real + this.rows2[2].year_real;
          this.rows2[3].year_diff = (this.rows2[3].year_real - this.rows2[3].year) //* 100 / this.rows1[4].year_real).toFixed(2);
        }, 600);
      });
    }
  }

  getDifference(row){
    if(row['init_diff'] == 0) return "";
    return row['init_diff']>0? "+" : "";
  }

  getMonthDifference(row){
    if(row['month_diff'] == 0) return "";
    return row['month_diff']>0? "+" : "";
  }

  getPercentaje(row: Object, real: string, flat: string, index: number){
    if(index === 1) return ((row[real] * 100) / row[flat]).toFixed(2) + ' %';
    return (100 - (row[real] * 100) / row[flat]).toFixed(2) + ' %';
  }

  async ngOnDestroy() {
    if(this.view === 'abuelas' || this.view === 'general'){
      this.sub$1.unsubscribe();
      this.sub$2.unsubscribe();
      this.sub$3.unsubscribe();
      this.sub$4.unsubscribe();
    }
    if(this.view === 'pesadas' || this.view === 'general'){
      this.sub$5.unsubscribe();
    }

    if(this.speaking || this.onPause){
      await this.speech.cancel();
    }
  }

  //Add commas
  transform(value: string | number): string {
    const val = typeof(value) === 'number'? value.toString() : value;
    return val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  segmentSelect(value){
    this.selected=value;
  }

  async speach() {
    const load = await this.loadCtrl.create({message:'Procesando....'});
    await load.present();
    console.log('has browser support',this.speech.hasBrowserSupport())
    if(!this.speech.hasBrowserSupport()){
      load.dismiss();
      return;
    }
    
    await this.speech.init();
    await this.speech.setLanguage('es-US');
    await this.speech.setVolume(1);
    load.dismiss();
    let texts = [];
    const YY = `Del Año ${this.current_year}`;
    const mmYY =  `Del Mes De ${this.months[this.current_month].header} ${YY}`;
    const fecha = `${this.time.getDate()} ${mmYY}`;

    if(this.view === 'abuelos'){
      texts.push({  business:  `Resumen ${this.selected === 'day'? `Del Día ${fecha}` : this.selected === 'year'? YY : mmYY}, Cierre Productivo De Abuelas Reproductoras Ross-Cobb.`, init_real: '', month_real: '', year_real: ''},  ...this.rows1)
    }else if(this.view === 'pesadas'){
      texts.push({ business:  `Resumen ${this.selected === 'day'? `Del Día  ${fecha}` : this.selected === 'year'? YY : mmYY}, Cierre Productivo De Reproductoras Pesadas.`, init_real: '', month_real: '', year_real: ''  }, ...this.rows2 )
    } else {
      texts.push({  business:  `Resumen ${this.selected === 'day'? `Del Día  ${fecha}` : this.selected === 'year'? YY : mmYY}, Cierre Productivo De Abuelas Reproductoras Ross-Cobb.`, init_real: '', month_real: '', year_real: ''},  ...this.rows1)
      texts.push({ business:  `Resumen ${this.selected === 'day'? `Del Día  ${fecha}` : this.selected === 'year'? YY : mmYY}, Cierre Productivo De Reproductoras Pesadas.`, init_real: '', month_real: '', year_real: ''  }, ...this.rows2 )
    }
    texts.push({business: 'Esto ha sido todo! Que tengas un buen día!', init_real: '', month_real: '', year_real: ''})
    texts.forEach(async el=>{
      await this.speech.speak({
        text: `${el.business}   ${
          this.selected === 'day'? el?.init_real : 
          this.selected === 'year'? el?.year_real :
          el?.month_real} 
          ${ el.month_diff<0? `con una diferencia del ${( 100 - el.month_real * 100 / el.month).toFixed(2).replace('.', ' punto ')} %` : '' } ` ,
        listeners: {
          onstart: () => {
            this.speaking = true;
          },
          onend: () => {
            this.speaking = false;
          },
          onresume: () => {
              console.log("Resume utterance")
          },
          onboundary: (event) => {
              console.log(event.name + ' boundary reached after ' + event.elapsedTime + ' milliseconds.')
          }
        }
      })
    });
  }

  async pause(){
    if(!this.onPause){
      await this.speech.pause();
      this.onPause = true;
    }
  }

  async resume(){
    if(this.onPause){
      await this.speech.resume();
      this.onPause = false;
    }
  }
}
