import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LotProjection } from '../models';
import { ApiService, LotService } from '../services';

@Component({
  selector: 'app-eggs-by-weeks',
  templateUrl: './eggs-by-weeks.page.html',
  styleUrls: ['./eggs-by-weeks.page.scss'],
})
export class EggsByWeeksPage implements OnInit {
  table = true;
  date = new Date();
  years = [this.date.getFullYear()-1, this.date.getFullYear(), this.date.getFullYear()+1]
  actual_year = new BehaviorSubject(this.date.getFullYear());
  rows = [];
  monthly = [];
  typeFilter=TypeFilter.Nacimientos;
  cols = [
    { prop: 'week_num', header: 'No.<br>Semana' },
    { prop: 'entry', header: 'Fecha<br>Semana' },
    { prop: 'year1', header: `Producción<br>Año ${this.years[1]}` },
    /* { prop: 'week', header: 'Fecha<br>Semana' },
    { prop: 'year1', header: `Producción<br>Año ${this.years[1]}` },
    { prop: 'week', header: 'Fecha<br>Semana' },
    { prop: 'year1', header: `Producción<br>Año ${this.years[2]}` } */
  ];
  month = [1,2,3,4,5,6,7,8,9,10,11,12];
  data=[];
  sub$: Subscription;
  constructor(
    private apiService: ApiService,
    private lotService: LotService
  ) { 
    
  }

  ngOnInit() { 
    let monthly = [];
    this.month.forEach((m, h) => {
      this.sub$ = this.actual_year.pipe(
        switchMap(val => {
          return this.apiService.getProyectionsByMonth({
            month: m, year: val as number
          })
        })
      ).subscribe(resp => {
        let numero_aves_anual = null;
        let month = [];
        for (let i = 1; i < 32; i++) {
          let pro = resp.filter((p)=> p.day === i && p.estado === "produccion" );
          let numero_nac = null;
          let d:Date  =null;
          pro.forEach((pro, k)=> {
            const el = pro as LotProjection
            d = new Date(el.dia)
            if(k < 595){
              numero_nac += parseInt(el.nacimientos_totales.toFixed(2));
              numero_aves_anual += parseInt(el.nacimientos_totales.toFixed(2));
            }
          })
          //console.log(`${m}: ${i}`, numero_aves)
          month.push({dia: d?.getDate(),day: d?.getDay(), numero_nac});
        }
        //console.log(`${headers[m-1]}: `,numero_aves_anual)
        if(!!m) monthly[m]={ month: m, data: month, balance: numero_aves_anual }
        //console.log(monthly);
        let data_l=[];
        let data_v=[];
        //console.log(monthly);
        monthly.forEach(month =>{
          let acc_l=0;
          let acc_v=0;
          if(!!month){
            month?.data.forEach(el => {
              
              if(el?.day > 4 || el?.day < 2){
                acc_l += el?.numero_nac;
                if(el.day===1) data_l.push({ date: new Date(`${2021}-${month.month}-${el.dia}`), day:  el.day, acc: acc_l })
              } else {
                acc_l=0;
              }
              
              if(el.day > 1 && el.day < 6){
                if(el.day < 5)acc_v += el?.numero_nac;
                if(el.day===5) data_v.push({ date: new Date(`${2021}-${month.month}-${el.dia}`), day:  el.day, acc: acc_v })
              } else {
                acc_v=0;
              }

            });

          }
        });

        this.rows = [];
        for (let i = 0; i < 53; i++) {
          let obj_l={}
          let obj_v={}
          obj_v['week_num']=i+1;
          obj_v['entry']= data_v[i]?.date
          obj_v['year1']= data_v[i]?.acc
          obj_l['week_num']=i+1;
          obj_l['entry']= data_l[i]?.date
          obj_l['year1']= data_l[i]?.acc
          if (!!data_v[i]?.acc) this.rows.push(obj_v);
          if (!!data_l[i]?.acc) this.rows.push(obj_l);
        }

        this.rows.forEach((row, i)=>{
          row.week_num = i+1;
        })
      })
    })
  }

  ngOnDestroy(){
    this.sub$.unsubscribe();
  }

  selected(event) { }

  filterByType(value){
    this.typeFilter=value;
  }

  setYear(value) {
    this.actual_year.next(new Date(value).getFullYear());
  }

}

enum TypeFilter{
  Hvo_Prod='huevos_producidos',
  Hvo_Incb='huevos_incubables',
  Nacimientos='nacimientos',
  Aves='aves'
}
