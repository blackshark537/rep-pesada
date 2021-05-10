import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiService } from '../services';

@Component({
  selector: 'app-daily-projection',
  templateUrl: './daily-projection.page.html',
  styleUrls: ['./daily-projection.page.scss'],
})
export class DailyProjectionPage implements OnInit, OnDestroy {
  table = true;
  actual_year = new BehaviorSubject(2021);
  rows = [];
  cols = [
    { prop: 'day', header: 'Dia' },
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
  month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  sub$: Subscription;
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    let headers = this.cols.filter(x => x.prop != 'day').map(val => val.prop);
    let anual = [];
    this.month.forEach((m, h) => {
      this.sub$ = this.actual_year.pipe(
        switchMap(val => {
          console.log(val)
          return this.apiService.getProyectionsByMonth({
            month: m, year: val as number
          })
        })
      ).subscribe(resp => {
        let numero_aves_anual = 0;
        let month = []
        for (let i = 1; i < 32; i++) {
          let pro = resp.filter(p => p.day === i);
          let numero_aves = 0;
          pro.forEach(el => {
            numero_aves += parseInt(el.numero_de_aves);
            numero_aves_anual += parseInt(el.numero_de_aves);
          })
          //console.log(`${headers[h]}: ${i}`, numero_aves)
          month.push(numero_aves);
        }
        //console.log(`${headers[h]}: `,numero_aves_anual)
        anual.push({ month: headers[h], data: month, balance: numero_aves_anual })
        this.rows = [];
        for (let i = 0; i < 31; i++) {
          let obj = {};
          obj['id'] = i;
          obj['day'] = i + 1;
          obj['jan'] = anual.filter(x => x.month == 'jan')[0]?.data[i];
          obj['feb'] = anual.filter(x => x.month == 'feb')[0]?.data[i];
          obj['mar'] = anual.filter(x => x.month == 'mar')[0]?.data[i];
          obj['apr'] = anual.filter(x => x.month == 'apr')[0]?.data[i];
          obj['may'] = anual.filter(x => x.month == 'may')[0]?.data[i];
          obj['jun'] = anual.filter(x => x.month == 'jun')[0]?.data[i];
          obj['jul'] = anual.filter(x => x.month == 'jul')[0]?.data[i];
          obj['ago'] = anual.filter(x => x.month == 'ago')[0]?.data[i];
          obj['sep'] = anual.filter(x => x.month == 'sep')[0]?.data[i];
          obj['oct'] = anual.filter(x => x.month == 'oct')[0]?.data[i];
          obj['nov'] = anual.filter(x => x.month == 'nov')[0]?.data[i];
          obj['dec'] = anual.filter(x => x.month == 'dec')[0]?.data[i];
          this.rows.push(obj);
        }
      })
    });
  }

  ngOnDestroy(){
    this.sub$.unsubscribe();
  }

  selected(event) { }

  setYear(value) {
    this.actual_year.next(new Date(value).getFullYear());
    this.ngOnInit();
  }
}
