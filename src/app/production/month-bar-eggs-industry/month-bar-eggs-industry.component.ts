import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppModel, EggLotProjectionInterface } from 'src/app/models';

@Component({
  selector: 'app-month-bar-eggs-industry',
  templateUrl: './month-bar-eggs-industry.component.html',
  styleUrls: ['./month-bar-eggs-industry.component.scss'],
})
export class MonthBarEggsIndustryComponent implements OnInit {
  show=false;
  
  multi1 = [];
  multi2 = [];
  multi3 = [];
  multi4 = [];
  headers = [
    {prop: 'jan', header: 'Enero'},
    {prop: 'feb', header: 'Febrero'},
    {prop: 'mar', header: 'Marzo'},
    {prop: 'apr', header: 'Abril'},
    {prop: 'may', header: 'Mayo'},
    {prop: 'jun', header: 'Junio'},
    {prop: 'jul', header: 'Julio'},
    {prop: 'ago', header: 'Agosto'},
    {prop: 'sep', header: 'Septiembre'},
    {prop: 'oct', header: 'Octubre'},
    {prop: 'nov', header: 'Noviembre'},
    {prop: 'dic', header: 'Diciembre'}
]
  date  = new Date();
  current_year =  this.date.getFullYear();

  month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  view: any[] = [window.innerWidth-100, window.innerHeight-140];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel1 = 'Población Promedio De G.Ponedoras En Recria y Producción Mensual';
  xAxisLabel2 = 'Producción Mensual De Huevos De Mesa';
  
  showYAxisLabel = true;
  yAxisLabel1 = 'G.Ponedoras Recria y Producción';
  yAxisLabel2 = 'Producción Huevos De Mesa';
  

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private loadCtrl: LoadingController,
    private store: Store<AppModel>
  ) { }

  async ngOnInit() {

    const load = await this.loadCtrl.create({message: 'Por Favor Espere....'});
    await load.present();
    this.store.select('eggLots').pipe(
      map(lots=>{
        let res = lots.map(lot=> lot.projections);
        return [].concat.apply([], res) as EggLotProjectionInterface[];
      })
    ).subscribe(response => {
      this.processData(response);
      load.dismiss();
    });
  }

  processData(projections: EggLotProjectionInterface[]){
    let monthly = []
    this.month.forEach((m, h) => {
      for (let i = 1; i < 32; i++) {
        let pro = projections.filter(p => p.month === m && p.day === i && p.year  === this.current_year);
        let numero_aves = 0;
        let numero_Ht = 0;
        let numero_Hi = 0;
        let numero_Na = 0;
        let d: Date = new Date();
        let daysInMonth: Date = null;
        let yr = null;
        pro.forEach((el, k) => {
          d = new Date(el.dia);
          let mt = d.getMonth() + 1;
          yr = d.getFullYear();
          daysInMonth = new Date(yr, mt, 0);
          if (k < 595) {
            numero_aves += el.numero_de_aves;
            numero_Ht += el.prod_huevos_totales;
          }
        });

        monthly.push({ numero_aves, numero_Ht, numero_Hi, numero_Na, month: this.headers[m - 1].header })
        if (i >= daysInMonth?.getDate()) continue;
      }

    });

    this.headers.forEach(h => {
      this.multi1.push({
        name: h.header,
        value: Math.floor(monthly.filter(m => m.month === h.header).map(m => m.numero_aves).reduce((p, c) => p += c) / 31)
      })

      this.multi2.push({
        name: h.header,
        value: Math.floor(monthly.filter(m => m.month === h.header).map(m => m.numero_Ht).reduce((p, c) => p += c))
      })

    });

    this.show = true;

  }
}
