import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import { AppModel } from '../models/AppModel';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EggLotProjectionInterface } from '../models';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-production',
  templateUrl: './production.page.html',
  styleUrls: ['./production.page.scss'],
})
export class ProductionPage implements OnInit, OnDestroy {
  date  = new Date();
  current_year =  this.date.getFullYear();
  res = []
  res2 = []

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;
  viewCard: number[] = [900, 400];
  viewPie: number[] = [1000, 400];
  colorScheme = {
    domain: ['#99D9F2', '#F2E205', '#F2B705', '#D93D04', '#D98E04', '#aae3f5']
  };
  cardColor: string = '#232837';

  //domainColors: ['#023859', '#038C8C', '#F2811D', '#F26716', '#BF1515', '#D98E04'],

  activateCard: boolean = false;
  activateArea: boolean = false;
  activatePie: boolean = false;

  viewArea: number[] = [window.innerWidth, window.innerHeight-50];
  legend: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Mes';
  yAxisLabel: string = 'Producción';
  timeline: boolean = true;

  resMulti = [{
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
  
  sub$: Subscription;

  constructor(
    public store: Store<AppModel>,
    private activatedRoute: ActivatedRoute,
    private loadCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.activateArea=false;
    this.activateCard=false;
    this.activatePie=false;

    const industry =  this.activatedRoute.snapshot.paramMap.get('industry');
    if( industry === Industry.lightBreeder)  this.lightBreederGraph();
    if( industry === Industry.eggsIndustry)  this.eggsIndustryGraph();
    
  }

  lightBreederGraph(){
    this.sub$ = this.store.select('projections').pipe(
      map(pro => {
        let result = pro.filter(p => p.year === this.current_year)
        return result;
      })
    ).subscribe(resp => {
      this.month.forEach((m, h) => {
        for (let i = 1; i < 32; i++) {
          let pro = resp.filter(p => p.month === m && p.day === i && p.estado === 'produccion');
          let numero_aves = 0;
          let numero_Ht = 0;
          let numero_Hi = 0;
          let numero_Na = 0;
          let d: Date = null;
          let daysInMonth: Date = null;
          pro.forEach((el, k) => {
            d = new Date(el.dia);
            let mt = d.getMonth() + 1;
            let yr = d.getFullYear();
            daysInMonth = new Date(yr, mt, 0);
            if (k < 595) {              
              numero_aves += parseInt(el.numero_de_aves);
              numero_Ht += parseInt(el.prod_huevos_totales);
              numero_Hi += parseInt(el.huevos_incubables);
              numero_Na += parseInt(el?.nacimientos_totales);
            }
          });
          
          this.resMulti[0].name="Aves En Produccion",
          this.resMulti[0].series.push({
            "value": numero_aves,
            "name":  `${d}`
          })
          this.resMulti[1].name="Huevos Totales",
          this.resMulti[1].series.push({
            "value": numero_Ht,
            "name":  `${d}`
          })
          this.resMulti[2].name="Huevos Incuvables",
          this.resMulti[2].series.push({
            "value": numero_Hi,
            "name":  `${d}`
          })
          this.resMulti[3].name="Pollitas Nacidas",
          this.resMulti[3].series.push({
            "value": numero_Na,
            "name":  `${d}`
          })
          if (i >= daysInMonth?.getDate())  continue;
        }
        
        this.activateArea=true;
      });
    });
  }

  async eggsIndustryGraph(){
    const load = await this.loadCtrl.create();
    await load.present();
    this.store.select('eggLots').subscribe(response => {
      let resp=[];
      response.forEach(lote=>{
        resp.push(...lote.projections.filter(p=>p.estado === 'produccion' && p.year === this.current_year ));
      });

      setTimeout(()=>{
        this.processData(resp);
        load.dismiss();
      }, 1000);
    });
  }

  processData(projections: EggLotProjectionInterface[]){
    this.month.forEach((m, h) => {
      for (let i = 1; i < 32; i++) {
        let pro = projections.filter(p => p.month === m && p.day === i );
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

        this.resMulti[0].name="Aves Ponedoras";
        this.resMulti[0].series.push({
          "value": numero_aves,
          "name":  `${d}`
        });

        this.resMulti[1].name="Huevos Totales";
        this.resMulti[1].series.push({
          "value": numero_Ht,
          "name":  `${d}`
        });

        this.resMulti[2].name="";
        this.resMulti[2].series=null;
        this.resMulti[3].name="";
        this.resMulti[3].series=null;
        if (i >= daysInMonth?.getDate())  continue;
      }

      this.activateArea=true;
    })
    
  }

  ngOnDestroy(){
    this.sub$.unsubscribe();
  }
}


enum Industry{
  lightBreeder='light-breeder',
  eggsIndustry='eggs-industry'
}