import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DatatableService } from '../services';

@Component({
  selector: 'app-daily-prod-projection',
  templateUrl: './daily-prod-projection.page.html',
  styleUrls: ['./daily-prod-projection.page.scss'],
})
export class DailyProdProjectionPage implements OnInit {
  table = true;
  title= 'Inventario De Aves En Producción';
  subtitle= 'Promedio Mensual De Aves En Producción';
  subtitle2= 'Existencia Diaria De Aves En Producción';
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
  real = false;

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
  customSearch=null;
  sub$: Subscription;
  sub1$: Subscription;
  constructor(
    private loadCtrl: LoadingController,
    private _ar: ActivatedRoute,
    private datatableService: DatatableService,
  ) { }

  async ngOnInit() {
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

    const load = await this.loadCtrl.create();
    await load.present();

    this.sub$ = this.datatableService.getReproductorasData(this.actual_year, this.estado, this.typeFilter, this.real)
    .subscribe(resp=>{  
      this.rows = resp.datatable;
      this.monthly = resp.monthlyBalance;

      setTimeout(()=>{
        load.dismiss();
      }, 1000);
    });
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  switch(){
    this.ngOnInit();
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

  search() {
    
    if(this.typeFilter === TypeFilter.Aves){
      this.title = `Reproductoras Pesadas - Inventario De Aves En ${this.estado==='produccion'?'Producción' : 'Recria'}`;
      this.subtitle = `Promedio Mensual De Aves En ${this.estado==='produccion'?'Producción' : 'Recria'}`;
      this.subtitle2= `Existencia Diaria De Aves En ${this.estado==='produccion'?'Producción' : 'Recria'}`;
      this.promedio = true;
    }
    
    if(this.typeFilter === TypeFilter.Hvo_Prod){
      this.title = 'Reproductoras Pesadas - Producción Nacional De Rep. Pesadas';
      this.subtitle = 'Producción Mensual De Huevos Totales De Rep. Pesadas';
      this.subtitle2= `Producción Nacional Diaria De Huevos Totales De Rep. Pesadas`;
      this.promedio = false;
    }

    if(this.typeFilter === TypeFilter.Hvo_Incb){
      this.title = 'Reproductoras Pesadas - Producción Nacional De Rep. Pesadas';
      this.subtitle = 'Producción Mensual De Huevos Inc. De Rep. Pesadas';
      this.subtitle2= `Producción Nacional Diaria De Huevos Inc. De Rep. Pesadas`;
      this.promedio = false;
    }

    if(this.typeFilter === TypeFilter.Nacimientos){
      this.title = 'Reproductoras Pesadas - Producción Nacional De Rep. Pesadas';
      this.subtitle = 'Producción Mensual De Pollitos De Rep. Pesadas';
      this.subtitle2= `Producción Nacional Diaria De Pollitos De Rep. Pesadas`;
      this.promedio = false;
    }

    if(this.typeFilter === TypeFilter.Nacimientos_Term){
      this.title = 'Producción Nacional De Pollos Terminados';
      this.subtitle = 'Producción Mensual De Pollos Terminados';
      this.subtitle2= `Producción Nacional Diaria De Pollos Terminados`;
      this.promedio = false;
    }
    
    if(!this.customSearch)this.ngOnInit();
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

  getTitle(){ 
    return this.title;
  }

}

enum TypeFilter {
  Hvo_Prod = 'huevos_producidos',
  Hvo_Incb = 'huevos_incubables',
  Nacimientos = 'nacimientos',
  Nacimientos_Term = 'nacimientos_terminados',
  Aves = 'aves'
}
