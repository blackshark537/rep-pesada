import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { projectionsActions } from '../actions';
import { AppModel } from '../models';
import { DatatableService } from '../services';

@Component({
  selector: 'app-daily-projection',
  templateUrl: './daily-projection.page.html',
  styleUrls: ['./daily-projection.page.scss'],
})
export class DailyProjectionPage implements OnInit, OnDestroy {
  table = true;
  title= 'Inventario De Aves En Producción';
  subtitle= 'Aves En Producción';
  promedio=true;
  std = false;
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
  customSearch=null;
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
  
  sub$: Subscription;
  constructor(
    private datatableService: DatatableService,
    private _ar: ActivatedRoute
  ) { }

  ngOnInit() {
    this.customSearch = this._ar.snapshot.paramMap.get('custom');
    if(this.customSearch){ 
      let state = this._ar.snapshot.paramMap.get('state');
      this.filterBy(state)
      this.actual_year = parseInt(this._ar.snapshot.paramMap.get('year'));
      this.typeFilter = this._ar.snapshot.paramMap.get('filter') as TypeFilter;
      this.search();
    }

    this.configSlides();
    addEventListener('resize', ev=>{
      ev.preventDefault();
      this.configSlides();
    });

    this.sub$ = this.datatableService.getAbuelosData(this.actual_year, this.estado, this.typeFilter, this.std)
    .subscribe(resp =>{
      this.rows = resp.datatable;
      this.monthly = resp.monthlyBalance;
    })
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  getPromedio(value){
    return Math.floor(value/31);
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
      this.slideOpts.slidesPerView = 6;
      this.resetSlides();
      return;
    }
  }

  resetSlides(){
    this.slides=false;
    setTimeout(()=> this.slides=true, 1);
  }

  switch(){
    //this.store.dispatch(projectionsActions.GET_PROJECTIONS());
    this.ngOnInit();
  }

  search() {
    //this.store.dispatch(projectionsActions.GET_PROJECTIONS());
    if(this.typeFilter === TypeFilter.Aves){
      this.title= `Progenitores Abuelos - Inventario De Aves En ${this.estado==='produccion'?  'Producción' :  'Recría' }`;
      this.subtitle= `Aves En ${this.estado==='produccion'?  'Producción' :  'Recría' }`;
      this.promedio=true;
    }
    if(this.typeFilter === TypeFilter.Hvo_Incb){
      this.title=  `Progenitores Abuelos - Huevos Incubables En ${this.estado==='produccion'?  'Producción' :  'Recría' }`;
      this.subtitle= `Huevos Incubables En ${this.estado==='produccion'?  'Producción' :  'Recría' }`;
      this.promedio=false;
    }
    if(this.typeFilter === TypeFilter.Hvo_Prod){
      this.title=  `Progenitores Abuelos - Huevos Totales En ${this.estado==='produccion'?  'Producción' :  'Recría' }`;
      this.subtitle= `Huevos Totales En ${this.estado==='produccion'?  'Producción' :  'Recría' }`;
      this.promedio=false;
    }
    if(this.typeFilter === TypeFilter.Nacimientos){
      this.title= 'Progenitores Abuelos - Pollitas Reproductoras';
      this.subtitle= `Pollitas Reproductoras`;
      this.promedio=false;
    }
    if(!this.customSearch) this.ngOnInit();
  }

  selected(event) { }

  filterBy(value) {
    this.estado = value;
  }

  filterByType(value) {
    this.typeFilter = value;
    this.filterBy('produccion')
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
