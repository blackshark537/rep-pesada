import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppModel, LotProjection } from '../models';
import { ApiService, LotService } from '../services';

@Component({
  selector: 'app-eggs-by-weeks',
  templateUrl: './eggs-by-weeks.page.html',
  styleUrls: ['./eggs-by-weeks.page.scss'],
})
export class EggsByWeeksPage implements OnInit {
  table = true;
  date = new Date();
  years = [this.date.getFullYear() - 1, this.date.getFullYear(), this.date.getFullYear() + 1]
  actual_year = new BehaviorSubject(this.date.getFullYear());
  rows = [];
  monthly = [];
  typeFilter = TypeFilter.Nacimientos;
  cols = [
    { prop: 'week_num', header: 'No.<br>Semana' },
    { prop: 'entry0', header: 'Fecha<br>Semana' },
    { prop: 'year0', header: `Producción<br>Año ${this.years[0]}` },
    { prop: 'entry1', header: 'Fecha<br>Semana' },
    { prop: 'year1', header: `Producción<br>Año ${this.years[1]}` },
    { prop: 'entry2', header: 'Fecha<br>Semana' },
    { prop: 'year2', header: `Producción<br>Año ${this.years[2]}` }
  ];
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  data = [];
  sub$: Subscription;
  constructor(
    private store: Store<AppModel>
  ) {

  }

  ngOnInit() {
    let monthly = [];
    let acc_month = {};
    //this.month.forEach((m, h) => {
    this.sub$ = this.store.select('projections').pipe(
      map(pro => pro.filter(p => p.year >= this.years[0]))
    ).subscribe(resp => {
      this.years.forEach((val, y) => {
        let numero_nac_anual = 0;
        this.months.forEach(m => {
          let month = [];
          for (let i = 1; i < 32; i++) {
            let pro = resp.filter(p => p.year === val && p.month === m && p.day === i );
            let numero_nac = 0;
            let d: Date = null;
            let daysInMonth: Date = null;

            pro.forEach((pro, k) => {
              const el = pro as LotProjection
              d = new Date(el.dia);
              let mt = d.getMonth() + 1;
              let yr = d.getFullYear();
              daysInMonth = new Date(yr, mt, 0);

              if (k < 595) {
                numero_nac += parseInt(el.nacimientos_totales);
                numero_nac_anual += parseInt(el.nacimientos_totales);
              }
            });
            //console.log(`${m}: ${i}`, numero_aves)
            month.push({ year: d?.getFullYear(), month: d?.getMonth() + 1, dia: d?.getDate(), day: d?.getDay(), numero_nac });
            if (i >= daysInMonth?.getDate()) continue;
          }
          //console.log(`${headers[m-1]}: `,numero_aves_anual)
          if (!!m) monthly.push({ year: val, month: m, data: month, balance: numero_nac_anual });

        });
      });

      let data_l = [];
      let data_v = [];
      monthly.forEach(month => {
        let acc_l = null;
        let acc_v = null;
        month?.data.forEach(el => {
          if (el?.day > 4 || el?.day < 2) {
            acc_l += el?.numero_nac;
            if (el.day === 1) data_l.push({ date: `${el.dia}/${el.month}/${month?.year}`, year: el?.year, day: el.day, acc: acc_l })
          } else {
            acc_l = null;
          }

          if (el.day > 1 && el.day < 6) {
            if (el.day < 5) acc_v += el?.numero_nac;
            if (el.day === 5) data_v.push({ date: `${el.dia}/${el.month}/${month?.year}`, year: el?.year, day: el.day, acc: acc_v })
          } else {
            acc_v = null;
          }
        });

      });

      let index_l = data_l.length;
      let index_v = data_v.length;
      let remind_l = 156 - index_l;
      let remind_v = 156 - index_v;

      for (let j = 0; j < remind_l; j++) {
        data_l.push({ date: null, year: data_l[index_l - 1]?.year, day: 1, acc: 0 });
      }
      for (let k = 0; k < remind_v; k++) {
        data_v.push({ date: null, year: data_v[index_v - 1]?.year, day: 5, acc: 0 });
      }

      //console.table(data_v)
      
      this.rows = [];
      for (let i = 0; i < 52; i++) {
        let obj_l = {}
        let obj_v = {}
        obj_l[`entry0`] = data_l.filter(x => x.year === this.years[0])[i]?.date;
        obj_l[`year0`] = data_l.filter(x => x.year === this.years[0])[i]?.acc;
        obj_v[`entry0`] = data_v.filter(x => x.year === this.years[0])[i]?.date;
        obj_v[`year0`] = data_v.filter(x => x.year === this.years[0])[i]?.acc;

        obj_l[`entry1`] = data_l.filter(x => x.year === this.years[1])[i]?.date;
        obj_l[`year1`] = data_l.filter(x => x.year === this.years[1])[i]?.acc;
        obj_v[`entry1`] = data_v.filter(x => x.year === this.years[1])[i]?.date;
        obj_v[`year1`] = data_v.filter(x => x.year === this.years[1])[i]?.acc;

        obj_l[`entry2`] = data_l.filter(x => x.year === this.years[2])[i]?.date;
        obj_l[`year2`] = data_l.filter(x => x.year === this.years[2])[i]?.acc;
        obj_v[`entry2`] = data_v.filter(x => x.year === this.years[2])[i]?.date;
        obj_v[`year2`] = data_v.filter(x => x.year === this.years[2])[i]?.acc;

        /* if (!!data_v[i]?.acc)   */this.rows.push(obj_v);
        /* if (!!data_l[i]?.acc)   */this.rows.push(obj_l);
      }

      this.rows.forEach((row, i) => {
        row.week_num = i + 1;
      });
    });

  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  selected(event) { }

  filterByType(value) {
    this.typeFilter = value;
  }

  setYear(value) {
    this.actual_year.next(new Date(value).getFullYear());
  }

}

enum TypeFilter {
  Hvo_Prod = 'huevos_producidos',
  Hvo_Incb = 'huevos_incubables',
  Nacimientos = 'nacimientos',
  Aves = 'aves'
}
