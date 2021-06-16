import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import { AppModel } from '../models/AppModel';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EggLotProjectionInterface, LotProjection } from '../models';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-production',
  templateUrl: './production.page.html',
  styleUrls: ['./production.page.scss'],
})
export class ProductionPage implements OnInit, OnDestroy {
  pieGraph=false;
  lightBreederMonth=false;
  BarMonthlylightBreeder=false;
  date  = new Date();
  current_year =  this.date.getFullYear();
  years = [this.current_year,this.current_year+1];
  title='';
  res = []
  res2 = []

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;
  viewCard: number[] = [900, 400];
  viewPie: number[] = [1000, 400];
  colorScheme = {
    domain: ['#023859', '#038C8C', '#F2811D', '#F26716', '#BF1515', '#D98E04']//['#99D9F2', '#F2E205', '#F2B705', '#D93D04', '#D98E04', '#aae3f5']
  };
  cardColor: string = '#232837';

  Colors: ['#023859', '#038C8C', '#F2811D', '#F26716', '#BF1515', '#D98E04']

  activateCard: boolean = false;
  activateArea: boolean = false;
  activatePie: boolean = false;

  viewArea: number[] = [window.innerWidth, window.innerHeight-50];
  legend: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Mes';
  yAxisLabel: string = 'Producción';
  timeline: boolean = true;

  resMulti0 = [{
    "name": "Aves En Produccion",
    "series": [

    ]
  },
  {
    "name": "Aves En Recria",
    "series": [

    ]
  }];

  resMulti1 = [{
    "name": "Aves En Produccion",
    "series": [
      
    ]
  },
  {
    "name": "Huevos Totales",
    "series": [
      
    ]
  },
  {
    "name": "Huevos Incuvables",
    "series": [
      
    ]
  },
  {
    "name": "Pollitas Nacidas",
    "series": [
      
    ]
  }
  ];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  
  //sub$: Subscription;
  chicksLightBreeder=false;
  industry=null;

  constructor(
    public store: Store<AppModel>,
    private activatedRoute: ActivatedRoute,
    private loadCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.activateArea=false;
    this.activateCard=false;
    this.activatePie=false;
    this.chicksLightBreeder=false;
    this.lightBreederMonth=false;
    this.pieGraph = false;

    this.industry =  this.activatedRoute.snapshot.paramMap.get('industry');

    if(this.industry === Industry.monthLightBreeder){
      this.lightBreederMonth=true;
    }

    if(this.industry === Industry.BarMonthlylightBreeder){
      this.BarMonthlylightBreeder=true;
    }

    if(this.industry === Industry.businessGraph){
      this.title='Participación Mercado - Empresa';
      this.pieGraph = true;
    }

    if( this.industry === Industry.lightBreeder){
      this.title='Producción Diaria Huevos Incubables/pollitas - Reproductora Liviana';
      this.lightBreederGraph();
    }
    if( this.industry === Industry.chicksLightBreeder){  
      this.title='Inventario De Aves Diario - Reproductora Liviana';
      this.chicksLightBreeder=true;
      this.lightBreederGraph();
    }
    if( this.industry === Industry.eggsIndustry) {
      this.title='Producción Nacional Diaria De Huevos De Mesa';
      this.eggsIndustryGraph();
    }
    if( this.industry === Industry.chicksEggsIndustry){
      this.title='Inventario De Aves Diario - De Huevos De Mesa';
      this.eggsIndustryGraph();
    }
    
  }

  getResult(){
    return this.chicksLightBreeder? this.resMulti0 : this.resMulti1;
  }

  lightBreederGraph(){
    this.years.forEach(year=>{
      this.store.select('projections').pipe(
        map(pro => {
          let result = pro.filter(p => p.year === year)
          return result;
        })
      ).subscribe(resp => {
        let estados  = ['recria',  'produccion']
        estados.forEach(estado =>{
          this.month.forEach((m, h) => {
            for (let i = 1; i < 32; i++) {
              let pro = resp.filter(p => p.month === m && p.day === i && p.estado === estado);
              let numero_aves = 0;
              let numero_Ht = 0;
              let numero_Hi = 0;
              let numero_Na = 0;
              let d: Date = null;
              let daysInMonth: Date = null;
              let yr = null;
              pro.forEach((el, k) => {
                d = new Date(el.dia);
                let mt = d.getMonth() + 1;
                yr = d.getFullYear();
                daysInMonth = new Date(yr, mt, 0);
                if (k < 595) {              
                  numero_aves += parseInt(el.numero_de_aves);
                  numero_Ht += parseInt(el.prod_huevos_totales);
                  numero_Hi += parseInt(el.huevos_incubables);
                  numero_Na += parseInt(el?.nacimientos_totales);
                }
              });
              
              if(!!d){
                if(estado === 'recria'){
                  this.resMulti0[0].name="Aves En Recria",
                  this.resMulti0[0].series.push({
                    "value": numero_aves,
                    "name":  `${d?.toLocaleDateString()}`
                  })
                } else  {
                  this.resMulti0[1].name="Aves En Produccion",
                  this.resMulti0[1].series.push({
                    "value": numero_aves,
                    "name":  `${d?.toLocaleDateString()}`
                  });
      
                  /* this.resMulti1[0].name="Aves En Produccion",
                  this.resMulti1[0].series.push({
                    "value": numero_aves,
                    "name":  `${d?.toLocaleDateString()}`
                  }); */
        
                  this.resMulti1[1].name="Huevos Totales",
                  this.resMulti1[1].series.push({
                    "value": numero_Ht,
                    "name":  `${d?.toLocaleDateString()}`
                  });
                  this.resMulti1[2].name="Huevos Incuvables",
                  this.resMulti1[2].series.push({
                    "value": numero_Hi,
                    "name":  `${d?.toLocaleDateString()}`
                  });
                  this.resMulti1[3].name="Pollitas Nacidas",
                  this.resMulti1[3].series.push({
                    "value": numero_Na,
                    "name":  `${d?.toLocaleDateString()}`
                  });
                }
              }
  
              if (i >= daysInMonth?.getDate())  continue;
            }
            
            this.activateArea=true;
          });
        });
        
      });
    });
  }

  async eggsIndustryGraph(){
    const load = await this.loadCtrl.create({message: 'Por Favor Espere....'});
    await load.present();
    this.store.select('eggLots').subscribe(response => {
      let resp=[];
      
      response.forEach(lote=>{
        resp.push(...lote.projections.filter(p=> p.year === this.current_year ));
      });

      setTimeout(()=>{
        this.processData(resp);
        load.dismiss();
      }, 1000);
    });
  }

  processData(projections: EggLotProjectionInterface[]) {

    this.years.forEach(year => {
      this.month.forEach((m, h) => {
        let estados = ['recria', 'produccion']
        estados.forEach(estado => {
          for (let i = 1; i < 32; i++) {
            let pro = projections.filter(p => p.estado === estado && p.month === m && p.day === i && p.year === year);
            let numero_aves = 0;
            let numero_Ht = 0;
            let d: Date = null;
            let daysInMonth: Date = null;
            pro.forEach((el, k) => {
              d = new Date(el.dia);
              let mt = d.getMonth() + 1;
              let yr = d.getFullYear();
              daysInMonth = new Date(yr, mt, 0);
              if (k < 595) {
                numero_aves += el.numero_de_aves;
                numero_Ht += el.prod_huevos_totales;
              }
            });

            /* */

            if (!!d) {
              if (this.industry === Industry.eggsIndustry) {
                if (estado != 'recria') {
                  this.resMulti1[1].name = "Huevos Totales";
                  this.resMulti1[1].series.push({
                    "value": numero_Ht,
                    "name": `${d?.toLocaleDateString()}`
                  });
                }

              } else {

                if (estado === 'recria') {

                  this.resMulti1[1].name = "Aves Ponedoras Recria";
                  this.resMulti1[1].series.push({
                    "value": numero_aves,
                    "name": `${d?.toLocaleDateString()}`
                  });

                } else {

                  this.resMulti1[0].name = "Aves Ponedoras Produccion";
                  this.resMulti1[0].series.push({
                    "value": numero_aves,
                    "name": `${d?.toLocaleDateString()}`
                  });

                }
              }
            }

            this.resMulti1[2].name = "";
            this.resMulti1[3].name = "";
            if (i >= daysInMonth?.getDate()) continue;
          }
        });
        this.activateArea = true;
      })
    })
  }

  ngOnDestroy(){
    
  }
}


enum Industry{
  lightBreeder='light-breeder',
  BarMonthlylightBreeder='bar-month-light-breeder',
  monthLightBreeder='bar-month-lot-breeder',
  businessGraph='pie-light-breeder',
  chicksLightBreeder='chicks-light-breeder',
  eggsIndustry='day-line-eggs-industry',
  chicksEggsIndustry='chicks-line-eggs-industry'
}