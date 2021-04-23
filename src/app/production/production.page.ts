import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import { AppModel } from '../models/AppModel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-production',
  templateUrl: './production.page.html',
  styleUrls: ['./production.page.scss'],
})
export class ProductionPage implements OnInit, OnDestroy {

  res = []
  res2 = []

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;
  viewCard: number[] = [900, 300];
  viewPie: number[] = [400, 400];
  colorScheme = {
    domain: ['#99D9F2', '#F2E205', '#F2B705', '#D93D04', '#D98E04', '#aae3f5']
  };
  cardColor: string = '#232837';

  //domainColors: ['#023859', '#038C8C', '#F2811D', '#F26716', '#BF1515', '#D98E04'],

  activateCard: boolean = false;
  activateArea: boolean = false;
  activatePie: boolean = false;

  viewArea: number[] = [600, 400];
  legend: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Empresas';
  yAxisLabel: string = 'Producción';
  timeline: boolean = true;

  single=[];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  
  sub$: Subscription;

  constructor(
    public store: Store<AppModel>
  ) { }

  ngOnInit() {
   this.sub$ = this.store.select('lots').pipe(
      map(_lots =>{
        return _lots.filter(lot => lot.status === 'production')
      })
    ).subscribe(result =>{
      this.res=[];
      this.res2=[];
      this.single=[];
      if(!!result) return;

      let recive=0;
      let Week=0;
      let Days=0;
      let mortp=0;
      let total=0;
      let birthTotal=0;
      let hincub=0;
      let prodHtotal=0;

      result.forEach(el =>{
        recive+= el.recive;
        Week+= el.week;
        Days+= el.days;
        mortp+= el.mortp;
        total+= el.total;
        birthTotal+= parseFloat(el.birthTotal);
        hincub+= parseFloat(el.hincub);
        prodHtotal+= parseFloat(el.prodHtotal);
        this.single.push({name: el.business, value: parseFloat(el.prodHtotal)})
      });


      this.res.push({name: 'Promedio Entrantes', value: (recive/result.length).toFixed(2) + ' ±0.5 aves' });
      this.res.push({name: 'Promedio Mortalidad', value: (mortp/result.length).toFixed(2) + '%'});
      this.res.push({name: 'Promedio Restantes', value: (total/result.length).toFixed(2) + ' ±0.5 aves' });
      //this.res.push({name: `Promedio Edad`, value: ` ${Math.round((Days/result.length)/7)} sem. \n ${Math.round(Days/result.length)} dias`});
      this.res.push({name: 'Promedio Nacimientos', value: Math.round(birthTotal/result.length) + ' huevos' });
      this.res.push({name: 'Promedio Incubables', value: Math.round(hincub/result.length) + ' huevos' });
      this.res.push({name: 'Promedio Producción', value: Math.round(prodHtotal/result.length) + ' huevos' });

      this.res2.push({name: 'Prom. Huevos Incubables', value: (hincub/result.length) });
      this.res2.push({name: 'Prom. Huevos Totales', value: (prodHtotal/result.length) });
    
    });
    
    setTimeout(() => {
      this.activateCard=true;
      this.activatePie=true;
    },100);

    setTimeout(() => {
      this.activateArea=true;
    },100);
  }

  ngOnDestroy(){
    this.sub$.unsubscribe();
  }
}
