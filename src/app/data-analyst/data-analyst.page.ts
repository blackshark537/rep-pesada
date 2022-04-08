import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppModel } from '../models';

@Component({
  selector: 'app-data-analyst',
  templateUrl: './data-analyst.page.html',
  styleUrls: ['./data-analyst.page.scss'],
})
export class DataAnalystPage implements OnInit {

  current_year = new Date().getFullYear();
  ///////////////  CARD CHART /////////////////////////////////////////////////////////////////////////////
  showCards = false;
  
  single: any[] = [{
    name: 'Número De Empresas',
    value: 0
  }, {
    name: 'Total Prog. Abuelos Asignadas',
    value: 0
  }, {
    name: 'Total De Aves En Recría',
    value: 0
  }, {
    name: 'Total De Aves En Producción',
    value: 0
  }];

  view: any[] = [window.innerWidth - 50, 200];
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  cardColor: string = '#232837';

  ///////////////  PIE  CHART /////////////////////////////////////////////////////////////////////////////
  singlePie: any[] = [{
    name: 'Aves En Recría',
    value: 0
  }, {
    name: 'Aves En Producción',
    value: 0
  }];

  viewPie: any[] = [window.innerWidth*0.5, window.innerHeight*0.5];
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  //////////////  BAR  CHART  //////////////////////////////////////////////////////////////////////////////
  showBAR = false;
  month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  multi = [];
  multi1 = [];
  multi2 = [];
  multi3 = [];
  multi4 = [];
  headers = [
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
    { prop: 'dic', header: 'Diciembre' }
  ];
  viewBar: any[] = [window.innerWidth*0.45, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = false;
  yAxisLabel: string = 'Meses';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Producción Mensual H.Incubables';

  constructor(
    private store: Store<AppModel>
  ) { }

  ngOnInit() {
    setTimeout(() => this.showCards = true, 500);
    this.calBusiness();
    
  }

  calBusiness(){
    this.store.select('businesses').subscribe(businesses=> {
      if(!businesses.length) return;
      this.single[0].value = businesses.length
      this.single[1].value = businesses.map(b=> parseInt(b.cant_gallinas_asignadas) ).reduce((p,c)=>  p+=c , 0);
      this.breedingAndProdLots();
      this.mothlyLightBreeder();
    });
  }

  breedingAndProdLots(){
    this.store.select('lots').subscribe(lots=>{
      if(!lots.length) return;
      this.single[2].value = lots.filter(l => l.status === 'breeding' && l.week < 18).map(l=> l.total).reduce((p,c)=> p+=c, 0);
      this.single[3].value = lots.filter(l => l.status === 'production' && l.days < 462).map(l=> l.total).reduce((p,c)=> p+=c, 0);
      this.singlePie[0].value = lots.filter(l => l.status === 'breeding' && l.week < 18).map(l=> l.total).reduce((p,c)=> p+=c, 0);
      this.singlePie[1].value = lots.filter(l => l.status === 'production' && l.days < 462).map(l=> l.total).reduce((p,c)=> p+=c, 0);
    })
  }

  mothlyLightBreeder() {
    this.store.select('projections').pipe(
      map(pro => {
        let result = pro.filter(p => p.year === this.current_year)
        return result;
      })
    ).subscribe(resp => {
      if(!resp.length) return;
      this.showBAR = false;

      let monthly = []

      this.month.forEach((m, h) => {
        for (let i = 1; i < 32; i++) {
          let pro = resp.filter(p => p.month === m && p.day === i);
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
            if (k < 462) {
              numero_aves += parseInt(el.numero_de_aves);
              numero_Ht += parseInt(el.prod_huevos_totales);
              numero_Hi += parseInt(el.huevos_incubables);
              numero_Na += parseInt(el?.nacimientos_totales);
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
          value: monthly.filter(m => m.month === h.header).map(m => m.numero_Ht).reduce((p, c) => p += c, 0)
        })

        this.multi3.push({
          name: h.header,
          value: monthly.filter(m => m.month === h.header).map(m => m.numero_Hi).reduce((p, c) => p += c, 0)
        })

        this.multi4.push({
          name: h.header,
          value: Math.floor(monthly.filter(m => m.month === h.header).map(m => m.numero_Na).reduce((p, c) => p += c, 0))
        })
      });

      this.headers.forEach(head=>{
        this.multi.push({
          name: head.header,
          series: [
            /* {
              name: 'Huevos Totales.',
              value: this.multi2.filter(x => x.name === head.header).map(val=>  val.value).reduce((p,c)=> p += c)
            }, */ {
              name: 'Huevos Inc.',
              value: this.multi3.filter(x => x.name === head.header).map(val=>  val.value).reduce((p,c)=> p += c, 0)
            },/*  {
              name: 'Pollitas Nac.',
              value: this.multi4.filter(x => x.name === head.header).map(val=>  val.value).reduce((p,c)=> p += c)
            } */
          ]
        })
      });

      this.showBAR = true;
    });
  }

}
