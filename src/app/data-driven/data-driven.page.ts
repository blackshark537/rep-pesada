import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppModel } from '../models';
import { ApiService } from '../services';

@Component({
  selector: 'app-data-driven',
  templateUrl: './data-driven.page.html',
  styleUrls: ['./data-driven.page.scss'],
})
export class DataDrivenPage implements OnInit {

  slideOpts = {
    initialSlide: 3,
    speed: 600,
    slidesPerView: 3,
    autoplay: true,
  };
  slides=true;

  year = new BehaviorSubject(new Date().getFullYear());

  actual_year= new Date().getFullYear();
  rows = [];
  status={
    asignacion:0,
    importacion:0,
    balance:0
  }
  cols  = [
    {prop: 'empresa', header:'Empresa y/o Productor'},
    {prop: 'entrydate', header:'Fecha de<br>Entrada'},
    {prop: 'asignacion', header:'Rep. Livianas<br>Asignadas'},
    {prop: 'importadas', header:'Rep. Livianas<br>Importadas'},
    {prop: 'balance', header:'Balance'},
    //{prop: 'cuota_asignacion', header:'Part. de<br>Asignación % '},
    {prop: 'cuota_importacion', header:'% Part. de<br>Importación'},
  ]

  asignacionTotal=0;

  constructor(
    private apiService: ApiService,
    private store: Store<AppModel>
  ) { }

  ngOnInit() {

    this.configSlides();
    addEventListener('resize', ev=>{
      ev.preventDefault();
      this.configSlides();
    });

    this.store.select('businesses').subscribe(empresas => {
      this.asignacionTotal = 0
      empresas.forEach(empresa => {
        this.asignacionTotal += parseInt(empresa?.cant_gallinas_asignadas)
        this.status.asignacion += parseInt(empresa?.cant_gallinas_asignadas)
      })


      this.year.pipe(
        switchMap(year => {
          return this.apiService.getLotsByYear(year).pipe(
            map(lots => {

              let importacionTotal = 0
              let row = [];
              this.status.importacion = 0,
              this.status.balance = 0
              
              lots.forEach(lot => {
                importacionTotal += parseInt(lot.cantidad.hembras)
                this.status.importacion += parseInt(lot.cantidad.hembras)
                this.status.balance = this.asignacionTotal - this.status.importacion
              });

              lots.forEach((lot, i) => {
                let r = row.filter(r => r.empresa === lot.empresa.nombre_comercial)[0]
                if (!!r) {
                  r.importadas += parseInt(lot.cantidad.hembras);
                  r.balance = this.asignacionTotal - parseInt(r.importadas)
                  r.cuota_importacion = ((parseInt(r.importadas) / importacionTotal) * 100).toFixed(2),
                    console.log('af', r)
                } else {
                  row.push({
                    id: i + 1,
                    lotId: lot.id,
                    empresa: lot?.empresa?.nombre_comercial,
                    entrydate: new Date(lot.fecha_entrada).toLocaleDateString(),
                    asignacion: lot.empresa?.cant_gallinas_asignadas,
                    importadas: parseInt(lot.cantidad.hembras),
                    cuota_asignacion: ((parseInt(lot.empresa?.cant_gallinas_asignadas) / this.asignacionTotal) * 100).toFixed(2),
                    cuota_importacion: ((parseInt(lot.cantidad.hembras) / importacionTotal) * 100).toFixed(2),
                    balance: parseInt(lot.empresa?.cant_gallinas_asignadas) - parseInt(lot.cantidad.hembras)
                  });
                }
              });
              return row;
            })
          );
        })).subscribe(rows => this.rows = rows);

    })
  }

  configSlides(){
    if(window.innerWidth < 500){
      this.slideOpts.slidesPerView = 1;
      this.resetSlides();
      return;
    }
    if(window.innerWidth > 500 && window.innerWidth < 1000){
      this.slideOpts.slidesPerView = 2;
      this.resetSlides();
      return;
    }
    if(window.innerWidth > 1000){
      this.slideOpts.slidesPerView = 3;
      this.resetSlides();
      return;
    }
  }

  resetSlides(){
    this.slides=false;
    setTimeout(()=> this.slides=true, 1);
  }

  setYear(value){
    this.year.next(new Date(value).getFullYear());
  }

  selected(evt){
  }
}
