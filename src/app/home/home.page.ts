import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppModel, EggLotProjectionInterface } from '../models';
import Speech from 'speak-tts';
import { LoadingController } from '@ionic/angular';

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
    { business: `Empresas Con Reproductoras Livianas`, init: null, month: null, icon:'business', color:'primary'},
    { business: `Reproductoras Asignadas Año ${this.transform(this.current_year)}`, init: null, month: null, icon:'cube', color:'success'},
    { business: 'Total De Aves En Recría 0 a 18 SEMANAS', init: null, month: null, icon:'logo-twitter', color:'tertiary'},
    { business: 'Total De Aves En Producción 19 a 85 SEMANAS', init: null, month: null, icon:'logo-twitter', color:'tertiary'},
    { business: 'Población De Reproductoras En Recría Y Producción', init: null, month: null, icon:'logo-twitter', color:'tertiary'},
    //{ business: 'MORTALIDAD EN PROCESO', init: null },
    { business: 'Producción Huevos Totales', init: null, month: null, icon:'egg', color:'warning'},
    { business: 'Producción Huevos Incubables', init: null, month: null, icon:'egg', color:'incub'},
    //{ business: 'HUEVOS INCUBABLES ACUMULADOS DEL MES', init: null },
    //{ business: `INCUBACION DE HUEVOS ASIGNADOS PARA ${this.months[this.current_month].header}`, init: null },
    { business: `Total De Pollitas Ponedoras Nacidas`, init: null, month: null, icon:'logo-twitter', color:'tertiary'},
    //{ business: 'TOTAL DE PRODUCTORES PROGRAMADOS ', init: null },
  ];

  rows2 = [
    { business: 'Número De Productores Dedicados a La Producción', init: 290, month: 290, icon:'business', color:'primary'},
    { business: 'Total De Gallinas En Recría 0 a 18 Semanas', init: null, month: null, icon:'logo-twitter', color:'tertiary'},
    { business: 'Total De Gallinas En Producción 19 a 85 Semanas.', init: null, month: null, icon:'logo-twitter', color:'tertiary'},
    { business: 'Población De Gallinas En Recría y Producción', init: null, month: null, icon:'logo-twitter', color:'tertiary'},
    { business: 'Producción Nacional De Huevos Totales', init: null, month: null, icon:'egg', color:'incub'},
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
  constructor(
    private store: Store<AppModel>,
    private loadCtrl: LoadingController
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
              if (k < 595) {
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
      for (let i = 1; i < 32; i++) {
        let pro = projections.filter(p => p.month === m && p.day === i );
        let numero_aves = null;
        let numero_huevos = null;
        let d: Date = null;
        let daysInMonth: Date = null;
        pro.forEach((el, k) => {
          d = new Date(el.dia);
          let mt = d.getMonth() + 1;
          let yr = d.getFullYear();
          daysInMonth = new Date(yr, mt, 0);
          if (k < 595) {
            numero_aves += el.numero_de_aves;
            numero_aves_anual += el.numero_de_aves;

            numero_huevos += el.prod_huevos_totales;
            numero_huevos_anual += el.prod_huevos_totales;
          }
        });
        //console.log(`${headers[m-1]}: ${i}`, numero_aves)
        month.push({numero_aves, numero_huevos, estado});
        if (i >= daysInMonth?.getDate())  continue;
      }
    });


    month.filter(m=>m?.estado === 'recria').forEach(m=>{
        this.rows2[1].month += m.numero_aves;
    })

    month.filter(m=>m?.estado === 'produccion').forEach(m=>{
      this.rows2[2].month += m.numero_aves;
      this.rows2[4].month += m.numero_huevos;
    })

    if(estado==='recria') this.rows2[1].month = Math.floor(this.rows2[1].month/month.length-1);
    if(estado==='produccion') this.rows2[2].month = Math.floor(this.rows2[2].month/month.length-1);
    this.rows2[3].month = this.rows2[1].month + this.rows2[2].month   
  }

  segmentSelect(value){
    this.selected=value;
  }

  async speach() {
    const speech = new Speech();
    const load = await this.loadCtrl.create({message:'Procesando....'});
    await load.present();
    console.log('has browser support',speech.hasBrowserSupport())
    if(!speech.hasBrowserSupport()){
      load.dismiss();
      return;
    }
    
    await speech.init();
    await speech.setLanguage('es-US');
    await speech.setVolume(1);
    load.dismiss();
    let texts = [{
      business:  `Resumen del ${this.selected === 'day'? 'Día' : 'Mes'}, Mercado Productivo Reproductoras Livianas`, init: '', month: ''
    },  ...this.rows1,  {
      business:  `Resumen del ${this.selected === 'day'? 'Día' : 'Mes'}, Mercado Productivo De La Industria De Huevos De Mesa`, init: '', month: ''
      
    }, ...this.rows2 ]
    texts.forEach(async el=>{
      await speech.speak({
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
}