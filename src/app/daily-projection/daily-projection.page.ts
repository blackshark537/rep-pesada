import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { projectionsActions } from '../actions';
import { AppModel } from '../models';

@Component({
  selector: 'app-daily-projection',
  templateUrl: './daily-projection.page.html',
  styleUrls: ['./daily-projection.page.scss'],
})
export class DailyProjectionPage implements OnInit, OnDestroy {
  table = true;
  title= 'Rep Livianas';
  promedio=true;
  actual_year = new Date().getFullYear();
  rows = [];
  monthly = [];
  slideOpts = {
    initialSlide: 3,
    speed: 600,
    slidesPerView: 7,
    autoplay: true,
  };
  slides=true;

  colors=['secondary', 'success', 'danger','warning', 'primary','light', 'tertiary','medium','secondary', 'success', 'danger', 'primary','light']
  estado = 'produccion'
  typeFilter = TypeFilter.Aves;
  cols = [
    { prop: 'day', header: 'Día' },
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
    private store: Store<AppModel>
  ) { }

  ngOnInit() {
    this.configSlides();
    addEventListener('resize', ev=>{
      ev.preventDefault();
      this.configSlides();
    });

    let headers = this.cols.filter(x => x.prop != 'day').map(val => val.header);
    let monthly = [];
    this.sub$ = this.store.select('projections').pipe(
      map(pro => {
        let result = pro.filter(p => p.year === this.actual_year)
        return result;
      })
    ).subscribe(resp => {
      this.month.forEach((m, h) => {
        let numero_aves_anual = 0;
        let month = [];
        for (let i = 1; i < 32; i++) {
          let pro = resp.filter(p => p.month === m && p.day === i && p.estado === this.estado);
          let numero_aves = null;
          let d: Date = null;
          let daysInMonth: Date = null;
          pro.forEach((el, k) => {
            d = new Date(el.dia);
            let mt = d.getMonth() + 1;
            let yr = d.getFullYear();
            daysInMonth = new Date(yr, mt, 0);
            if (k < 595) {
              switch (this.typeFilter) {
                case TypeFilter.Aves:
                  numero_aves += parseInt(el.numero_de_aves);
                  numero_aves_anual += parseInt(el.numero_de_aves);
                  break;
                case TypeFilter.Hvo_Prod:
                  numero_aves += parseInt(el.prod_huevos_totales);
                  numero_aves_anual += parseInt(el.prod_huevos_totales);
                  break;
                case TypeFilter.Hvo_Incb:
                  numero_aves += parseInt(el.huevos_incubables);
                  numero_aves_anual += parseInt(el.huevos_incubables);
                  break;
                case TypeFilter.Nacimientos:
                  numero_aves += parseInt(el?.nacimientos_totales);
                  numero_aves_anual += parseInt(el?.nacimientos_totales);
                  break;
                default:
                  break;
              }
            }
          });
          //console.log(`${headers[m-1]}: ${i}`, numero_aves)
          month.push(numero_aves);
          if (i >= daysInMonth?.getDate())  continue;
        }
        //console.log(`${headers[m-1]}: `,numero_aves_anual)
        monthly.push({ month: headers[m - 1], data: month, balance: Math.floor(numero_aves_anual/31) })
        this.rows = [];
        for (let i = 0; i < 31; i++) {
          let obj = {};
          obj['id'] = i;
          obj['day'] = i + 1;
          obj['jan'] = monthly.filter(x => x.month == 'Enero')[0]?.data[i];
          obj['feb'] = monthly.filter(x => x.month == 'Febrero')[0]?.data[i];
          obj['mar'] = monthly.filter(x => x.month == 'Marzo')[0]?.data[i];
          obj['apr'] = monthly.filter(x => x.month == 'Abril')[0]?.data[i];
          obj['may'] = monthly.filter(x => x.month == 'Mayo')[0]?.data[i];
          obj['jun'] = monthly.filter(x => x.month == 'Junio')[0]?.data[i];
          obj['jul'] = monthly.filter(x => x.month == 'Julio')[0]?.data[i];
          obj['ago'] = monthly.filter(x => x.month == 'Agosto')[0]?.data[i];
          obj['sep'] = monthly.filter(x => x.month == 'Septiembre')[0]?.data[i];
          obj['oct'] = monthly.filter(x => x.month == 'Octubre')[0]?.data[i];
          obj['nov'] = monthly.filter(x => x.month == 'Noviembre')[0]?.data[i];
          obj['dec'] = monthly.filter(x => x.month == 'Diciembre')[0]?.data[i];
          this.rows.push(obj);
        }
        this.monthly = [
          { month: 'Enero', balance: monthly.filter(x => x.month == 'Enero')[0]?.balance },
          { month: 'Febrero', balance: monthly.filter(x => x.month == 'Febrero')[0]?.balance },
          { month: 'Marzo', balance: monthly.filter(x => x.month == 'Marzo')[0]?.balance },
          { month: 'Abril', balance: monthly.filter(x => x.month == 'Abril')[0]?.balance },
          { month: 'Mayo', balance: monthly.filter(x => x.month == 'Mayo')[0]?.balance },
          { month: 'Junio', balance: monthly.filter(x => x.month == 'Junio')[0]?.balance },
          { month: 'Julio', balance: monthly.filter(x => x.month == 'Julio')[0]?.balance },
          { month: 'Agosto', balance: monthly.filter(x => x.month == 'Agosto')[0]?.balance },
          { month: 'Septiembre', balance: monthly.filter(x => x.month == 'Septiembre')[0]?.balance },
          { month: 'Octubre', balance: monthly.filter(x => x.month == 'Octubre')[0]?.balance },
          { month: 'Noviembre', balance: monthly.filter(x => x.month == 'Noviembre')[0]?.balance },
          { month: 'Diciembre', balance: monthly.filter(x => x.month == 'Diciembre')[0]?.balance },
        ]
      })
    });
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  configSlides(){
    if(window.innerWidth < 500){
      this.slideOpts.slidesPerView = 2;
      this.resetSlides();
      return;
    }
    if(window.innerWidth > 500 && window.innerWidth < 1000){
      this.slideOpts.slidesPerView = 3;
      this.resetSlides();
      return;
    }
    if(window.innerWidth > 1000 && window.innerWidth < 1100){
      this.slideOpts.slidesPerView = 5;
      this.resetSlides();
      return;
    }
    if(window.innerWidth > 1100){
      this.slideOpts.slidesPerView = 7;
      this.resetSlides();
      return;
    }
  }

  resetSlides(){
    this.slides=false;
    setTimeout(()=> this.slides=true, 1);
  }

  search() {
    this.store.dispatch(projectionsActions.GET_PROJECTIONS());
    if(this.typeFilter === TypeFilter.Aves){
      this.title= 'Rep Livianas';
      this.promedio=true;
    }
    if(this.typeFilter === TypeFilter.Hvo_Incb){
      this.title=  'H. Incubables';
      this.promedio=false;
    }
    if(this.typeFilter === TypeFilter.Hvo_Prod){
      this.title=  'H. Totales';
      this.promedio=false;
    }
    if(this.typeFilter === TypeFilter.Nacimientos){
      this.title= 'Pollitas Nacidas';
      this.promedio=false;
    }
    this.ngOnInit();
  }

  selected(event) { }

  filterBy(value) {
    this.estado = value;
  }

  filterByType(value) {
    this.typeFilter = value;
    if (value != TypeFilter.Aves) this.filterBy('produccion')
  }

  setYear(value) {
    this.actual_year = new Date(value).getFullYear();
  }

  getTitle(typeFilter: TypeFilter){ 
    return this.title;
  }

}

enum TypeFilter {
  Hvo_Prod = 'huevos_producidos',
  Hvo_Incb = 'huevos_incubables',
  Nacimientos = 'nacimientos',
  Aves = 'aves'
}
