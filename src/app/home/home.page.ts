import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppModel, EggLotProjectionInterface } from '../models';
import Speech from 'speak-tts';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

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
  rows1 = [
    //{ key:'FECHA CON CONTADOR DE TIEMPO' },
    { business: `Empresas Con Abuelas Reproductoras`, init: null, month: null, icon:'business', color:'primary'},
    { business: `Abuelas Reproductoras Asignadas Año ${this.transform(this.current_year)}`, init: null, month: null, icon:'cube', color:'success'},
    { business: 'Total De Aves En Recría 0 a 24 SEMANAS', init: null, month: null, icon:'logo-twitter', color:'tertiary'},
    { business: 'Total De Aves En Producción 24 a 66 SEMANAS', init: null, month: null, icon:'logo-twitter', color:'tertiary'},
    { business: 'Población De Abuelas Reproductoras En Recría Y Producción', init: null, month: null, icon:'logo-twitter', color:'tertiary'},
    //{ business: 'MORTALIDAD EN PROCESO', init: null },
    { business: 'Producción Huevos Totales', init: null, month: null, icon:'egg', color:'warning'},
    { business: 'Producción Huevos Incubables', init: null, month: null, icon:'egg', color:'incub'},
    //{ business: 'HUEVOS INCUBABLES ACUMULADOS DEL MES', init: null },
    //{ business: `INCUBACION DE HUEVOS ASIGNADOS PARA ${this.months[this.current_month].header}`, init: null },
    { business: `Total De Pollitas Reproductoras Nacidas`, init: null, month: null, icon:'logo-twitter', color:'tertiary'},
    //{ business: 'TOTAL DE PRODUCTORES PROGRAMADOS ', init: null },
  ];

  rows2 = [
    { business: 'Número De Empresas Dedicadas a La Crianza De Reproductoras', init: 32, month: 32, icon:'business', color:'primary'},
    { business: 'Total De Reproductoras Pesadas En Recría 0 a 24 Semanas', init: null, month: null, icon:'logo-twitter', color:'tertiary'},
    { business: 'Total De Reproductoras Pesadas En Producción 24 a 66 Semanas.', init: null, month: null, icon:'logo-twitter', color:'tertiary'},
    { business: 'Población De Reproductoras Pesadas En Recría y Producción', init: null, month: null, icon:'logo-twitter', color:'tertiary'},
    { business: 'Producción Nacional De Huevos Fertiles', init: null, month: null, icon:'egg', color:'incub'},
    { business: `Producción Nacional De Pollitos Nacidos`, init: null, month: null, icon:'logo-twitter', color:'tertiary'},
    { business: `Producción Nacional De Pollos Terminados`, init: null, month: null, icon:'logo-twitter', color:'tertiary'},
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

  month = [this.current_month];

  sub$1: Subscription;
  sub$2: Subscription;
  sub$3: Subscription;
  sub$4: Subscription;
  abuelos:boolean=true;
  //Speach
  speech: Speech = new Speech();

  constructor(
    private store: Store<AppModel>,
    private _ar: ActivatedRoute,
    private loadCtrl: LoadingController
  ) { 
    if(!this.speech) this.speech = new Speech();
  }

  ngOnInit() {
    //const time2=new Date(this.time.getTime() - (this.time.getHours()*60*60*1000));
    this.abuelos = this._ar.snapshot.paramMap.get('abuelos') === 'true'? true : false;
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
      this.rows1[0].month = resp.length;
      this.rows1[1].month = gallinas_asignadas;
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
        return a.filter(l => l.days >0 && l.days < 462);
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
      this.rows2[5].init = 0;
      this.rows2[6].init = 0;
      lots.filter(lot => lot.weeks_passed > 0 && lot.weeks_passed < 25).forEach(lot => {
        this.rows2[1].init += lot.cant_gallinas_existentes;
      });
      console.table(lots.filter(lot => lot.weeks_passed > 24 && lot.weeks_passed < 66));
      lots.filter(lot => lot.weeks_passed > 24 && lot.weeks_passed < 66).forEach(lot => {
        this.rows2[2].init += lot.cant_gallinas_existentes;
        this.rows2[4].init += lot.production;
        this.rows2[5].init += parseInt(lot.numero_nacimientos);
        this.rows2[6].init += lot.nacimientos_terminados
      });
      this.rows2[3].init = this.rows2[1].init + this.rows2[2].init;
      
    });

    this.getMonthlyData();
    this.getMonthlyDataProd();
  }

  ngOnDestroy() {
    this.sub$1.unsubscribe();
    this.sub$2.unsubscribe();
    this.sub$3.unsubscribe();
  }

  transform(value: string | number): string {
    return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  getMonthlyData(){
    this.store.select('projections').pipe(
      map(pro => {
        let result = pro.filter(p => p.year === this.current_year);
        return result;
      })
    ).subscribe(resp=>{
        if(!resp.length) return;
        let numero_aves_anual = 0;
        let numero_H_anual = 0;
        let numero_H_inc_anual = 0;
        let numero_Nac_anual = 0;
        let month = [];
        let state = ['recria', 'produccion'];
        state.forEach(estado=>{
          for (let i = 1; i < 32; i++) {
            let pro = resp.filter(p => p.month === this.current_month && p.day === i && p.estado === estado);
            let numero_aves = null;
            let numero_Ht = null;
            let numero_Hi = null;
            let numero_Nac = null;
            let d: Date = null;
            let daysInMonth: Date = null;
            pro.forEach((el, k) => {
              d = new Date(el.dia);
              let mt = d.getMonth() + 1;
              let yr = d.getFullYear();
              daysInMonth = new Date(yr, mt, 0);
              if (k < 476) {
                numero_aves += parseInt(el.numero_de_aves);
                numero_aves_anual += parseInt(el.numero_de_aves);
  
                numero_Ht += parseInt(el.prod_huevos_totales);
                numero_H_anual += parseInt(el.prod_huevos_totales);
  
                numero_Hi += parseInt(el.huevos_incubables);
                numero_H_inc_anual += parseInt(el.huevos_incubables);
  
                numero_Nac += parseInt(el.nacimientos_totales);
                numero_Nac_anual += parseInt(el.nacimientos_totales);
              }
            });
            month.push({numero_aves, numero_Hi, numero_Ht, numero_Nac, estado});
            if (i >= daysInMonth?.getDate()) continue;
          }
        });
        //console.log(`${headers[m-1]}: `,numero_aves_anual)
        //monthly.push({ month: this.current_month, data: month, balance: numero_aves_anual })
        this.rows1[2].month = 0;
        this.rows1[3].month = 0;
        this.rows1[4].month = 0;
        this.rows1[5].month = 0;
        this.rows1[6].month = 0;
        this.rows1[7].month = 0;
        month.filter(m=> m.estado === 'recria').forEach(m=>{
          this.rows1[2].month += m.numero_aves;
        });
        
        this.rows1[2].month = Math.floor(this.rows1[2].month/(month.length/2)-1)

        month.filter(m=> m.estado === 'produccion').forEach(m=>{
          this.rows1[3].month += m.numero_aves;
          this.rows1[5].month += m.numero_Ht;
          this.rows1[6].month += m.numero_Hi;
          this.rows1[7].month += m.numero_Nac;
        });
        this.rows1[3].month = Math.floor(this.rows1[3].month/(month.length/2)-1)
        this.rows1[4].month = this.rows1[2].month + this.rows1[3].month;
    });
  }

  getMonthlyDataProd(){
    this.store.select('eggLots').subscribe(response => {
      let estados=['recria', 'produccion'];
      estados.forEach(estado=>{
        let resp=[];
        response.forEach(lote=>{
          resp.push(...lote.projections.filter(p=>p.estado === estado && p.year === this.current_year ));
        });
        
        if(resp.length)this.processMonthlyDataProd(resp, estado);
      })
    });
  }

  processMonthlyDataProd(projections: EggLotProjectionInterface[], estado: string){
    let month = [];
    this.month.forEach((m, h) => {
      let numero_aves_anual = 0;
      let numero_huevos_anual = 0;
      let numero_huevos_inc_anual = 0;
      let numero_nacimientos_anual = 0;
      let numero_pollos_terminados_anual = 0;

      for (let i = 1; i < 32; i++) {
        let pro = projections.filter(p => p.month === m && p.day === i );

        let numero_aves = null;
        let numero_huevos = null;
        let numero_huevos_inc = null;
        let numero_nacimientos = null;
        let numero_pollos_terminados = null;

        let d: Date = null;
        let daysInMonth: Date = null;
        pro.forEach((el, k) => {
          d = new Date(el.dia);
          let mt = d.getMonth() + 1;
          let yr = d.getFullYear();
          daysInMonth = new Date(yr, mt, 0);
          if (k < 462) {
            numero_aves += el.numero_de_aves;
            //numero_aves_anual += el.numero_de_aves;

            numero_huevos += el.prod_huevos_totales;
            //numero_huevos_anual += el.prod_huevos_totales;

            numero_huevos_inc += parseInt(el.huevos_incubables);
            //numero_huevos_inc_anual += parseInt(el.huevos_incubables);

            numero_nacimientos += parseInt(el.nacimientos_totales);
            //numero_nacimientos_anual += parseInt(el.nacimientos_totales);

            numero_pollos_terminados += el.nacimientos_terminados;
            //numero_pollos_terminados_anual += el.nacimientos_terminados;
          }
        });
        //console.log(`${headers[m-1]}: ${i}`, numero_aves)
        month.push({numero_aves, numero_huevos, estado, numero_huevos_inc, numero_nacimientos, numero_pollos_terminados});
        if (i >= daysInMonth?.getDate())  continue;
      }
    });


    month.filter(m=>m?.estado === 'recria').forEach(m=>{
        this.rows2[1].month += m.numero_aves;
    })

    //////////////////
    //console.table(month.filter(m=>m?.estado === 'produccion'))

    month.filter(m=>m?.estado === 'produccion').forEach(m=>{
      this.rows2[2].month += m.numero_aves;
      this.rows2[4].month += m.numero_huevos;
      this.rows2[5].month += m.numero_nacimientos;
      this.rows2[6].month += m.numero_pollos_terminados;
    })

    if(estado==='recria') this.rows2[1].month = Math.floor(this.rows2[1].month/month.length-1);
    if(estado==='produccion') this.rows2[2].month = Math.floor(this.rows2[2].month/month.length-1);
    this.rows2[3].month = this.rows2[1].month + this.rows2[2].month   
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
    let texts = []
    
    if(this.abuelos){
      texts.push({  business:  `Resumen del ${this.selected === 'day'? 'Día' : 'Mes'}, Cierre Productivo De Abuelas Reproductoras Ross-Cobb.`, init: '', month: ''},  ...this.rows1)
    }else{
      texts.push({ business:  `Resumen del ${this.selected === 'day'? 'Día' : 'Mes'}, Cierre Productivo De Reproductoras Pesadas.`, init: '', month: ''  }, ...this.rows2 )
    }

    texts.forEach(async el=>{
      await this.speech.speak({
        text: `${el.business}   ${this.selected === 'day'? el.init : el.month}`,
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
    console.log('pause')
    await this.speech.paused();
  }
}