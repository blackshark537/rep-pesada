import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppModel, EggLotInterface } from '../models';

@Component({
  selector: 'app-births-by-weeks',
  templateUrl: './births-by-weeks.page.html',
  styleUrls: ['./births-by-weeks.page.scss'],
})
export class BirthsByWeeksPage implements OnInit {
  table = true;
  date = new Date();
  years = [this.date.getFullYear() - 1, this.date.getFullYear(), this.date.getFullYear() + 1]
  actual_year = new BehaviorSubject(this.date.getFullYear());
  rows = [];
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
  
  sub$: Subscription;

  constructor(
    private store: Store<AppModel>,
    private loading: LoadingController
  ) {}

  async ngOnInit() {
    let load = await this.loading.create({
      message: 'Cargando proyecciones<br> porfavor espere....'
    });
    await load.present();
    this.sub$ = this.store.select('eggLots').pipe(
      map(pro => pro.filter(p => p.year > this.years[0]-1))
    ).subscribe(resp => {
      if(!!resp.length) this.displayData(resp);
    });

  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  async displayData(monthly: EggLotInterface[]) {
    console.log(monthly[0]);
    let data_l: EggLotInterface[] = monthly.filter(x => x.day_name==='lunes');
    let data_v: EggLotInterface[] = monthly.filter(x => x.day_name==='viernes');

    this.rows = [];
    for (let i = 0; i < 52; i++) {
      let obj_l = {}
      let obj_v = {}
      obj_l[`entry0`] = data_l.filter(x => x?.year === this.years[0])[i]?.date;
      obj_l[`year0`] = data_l.filter(x => x?.year === this.years[0])[i]?.cant_gallinas_proyectadas;
      obj_v[`entry0`] = data_v.filter(x => x?.year === this.years[0])[i]?.date;
      obj_v[`year0`] = data_v.filter(x => x?.year === this.years[0])[i]?.cant_gallinas_proyectadas;

      obj_l[`entry1`] = data_l.filter(x => x?.year === this.years[1])[i]?.date;
      obj_l[`year1`] = data_l.filter(x => x?.year === this.years[1])[i]?.cant_gallinas_proyectadas;
      obj_v[`entry1`] = data_v.filter(x => x?.year === this.years[1])[i]?.date;
      obj_v[`year1`] = data_v.filter(x => x?.year === this.years[1])[i]?.cant_gallinas_proyectadas;

      obj_l[`entry2`] = data_l.filter(x => x?.year === this.years[2])[i]?.date;
      obj_l[`year2`] = data_l.filter(x => x?.year === this.years[2])[i]?.cant_gallinas_proyectadas;
      obj_v[`entry2`] = data_v.filter(x => x?.year === this.years[2])[i]?.date;
      obj_v[`year2`] = data_v.filter(x => x?.year === this.years[2])[i]?.cant_gallinas_proyectadas;

      this.rows.push({...obj_v},{...obj_l});
      //this.rows.push(obj_l);
    }

    this.rows.forEach((row, i) => {
      row.week_num = i + 1;
      row.id = i
    });

    await this.loading.dismiss();
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