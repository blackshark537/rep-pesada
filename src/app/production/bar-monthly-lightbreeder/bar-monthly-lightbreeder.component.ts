import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppModel } from 'src/app/models';

@Component({
  selector: 'app-bar-monthly-lightbreeder',
  templateUrl: './bar-monthly-lightbreeder.component.html',
  styleUrls: ['./bar-monthly-lightbreeder.component.scss'],
})
export class BarMonthlyLightbreederComponent implements OnInit {
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
  xAxisLabel1 = 'Poblacion Promedio Mensual De Aves En Recria y Producción';
  xAxisLabel2 = 'Producción Huevos Totales Por Mes';
  xAxisLabel3 = 'Producción Huevos Incubables Por Mes';
  xAxisLabel4 = 'Total Pollitas Reproductoras Por Mes';
  showYAxisLabel = true;
  yAxisLabel1 = 'Aves Recria y Produccion';
  yAxisLabel2 = 'Producción Huevos Totales';
  yAxisLabel3 = 'Producción Huevos Incubables';
  yAxisLabel4 = 'Pollitas Reproductoras';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private store: Store<AppModel>
  ) { }

  ngOnInit() {
    
      this.store.select('projections').pipe(
        map(pro => {
          let result = pro.filter(p => p.year === this.current_year)
          return result;
        })
      ).subscribe(resp => {
        this.show=false;
        
        let monthly=[]
        
          this.month.forEach((m, h) => {
            for (let i = 1; i < 32; i++) {
              let pro = resp.filter(p => p.month === m && p.day === i );
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
                  numero_aves += parseInt(el.numero_de_aves);
                  numero_Ht += parseInt(el.prod_huevos_totales);
                  numero_Hi += parseInt(el.huevos_incubables);
                  numero_Na += parseInt(el?.nacimientos_totales);
                }
              });
              
              monthly.push({ numero_aves,  numero_Ht, numero_Hi, numero_Na, month: this.headers[m-1].header})
              if (i >= daysInMonth?.getDate())  continue;
            }
            
          });

        this.headers.forEach(h=>{
          this.multi1.push({ 
            name: h.header,
            value: Math.floor(monthly.filter(m=> m.month === h.header).map(m=> m.numero_aves).reduce((p,c)=> p+=c, 0)/31)
          })

          this.multi2.push({ 
            name: h.header,
            value: monthly.filter(m=> m.month === h.header).map(m=> m.numero_Ht).reduce((p,c)=> p+=c, 0)
          })

          this.multi3.push({ 
            name: h.header,
            value: monthly.filter(m=> m.month === h.header).map(m=> m.numero_Hi).reduce((p,c)=> p+=c, 0)
          })

          this.multi4.push({ 
            name: h.header,
            value: Math.floor(monthly.filter(m=> m.month === h.header).map(m=> m.numero_Na).reduce((p,c)=> p+=c, 0))
          })
        });

        /* this.multi2.push({ name:`${m.month}`, value: m.numero_Ht})
        this.multi3.push({ name:`${m.month}`, value: m.numero_Hi})
        this.multi4.push({ name:`${m.month}`, value: m.numero_Na}) */
        this.show=true;
        
      });

  }
}
