import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApiService, BrowserService } from '../services';

@Component({
  selector: 'app-monthly-data',
  templateUrl: './monthly-data.page.html',
  styleUrls: ['./monthly-data.page.scss'],
})
export class MonthlyDataPage implements OnInit {
  year= new BehaviorSubject(new Date().getFullYear());
  actual_year= new Date().getFullYear();
  importacion=0;
  rows = [];
  calendar=[];
  cols=[
    {prop: 'empresa', header: 'Nombre <br>Comercial'},
    {prop: 'entry', header:'Fecha de <br>Entrada'},
    //{prop: 'asignacion',  header: 'Asignación'},
    //{prop: 'balance', header: 'Balance'},
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
    {prop: 'dic', header: 'Diciembre'},
  ];

  colors=['secondary', 'success', 'danger','warning', 'primary','light', 'tertiary','medium','secondary', 'success', 'danger', 'primary','light']

  slideOpts;

  constructor(
    private apiService: ApiService,
    public bS: BrowserService
  ) { 
    this.slideOpts = bS.configSlides(7);
  }

  ngOnInit() {
    this.year.pipe(
      switchMap(year =>{
      return this.apiService.getLotsByYear(year).pipe(
        map(lots=>{
          let row = [];
          lots.forEach( (lot,i) => {  
            row.push({
              id: i+1,
              empresa: lot.empresa?.nombre_comercial,
              entry: new Date(lot.fecha_entrada).toLocaleDateString(),
              jan: lot.fecha_entrada.split('-')[1]==='01'? parseInt(lot.cantidad.hembras) : 0,
              feb: lot.fecha_entrada.split('-')[1]==='02'? parseInt(lot.cantidad.hembras) : 0,
              mar: lot.fecha_entrada.split('-')[1]==='03'? parseInt(lot.cantidad.hembras) : 0,
              apr: lot.fecha_entrada.split('-')[1]==='04'? parseInt(lot.cantidad.hembras) : 0,
              may: lot.fecha_entrada.split('-')[1]==='05'? parseInt(lot.cantidad.hembras) : 0,
              jun: lot.fecha_entrada.split('-')[1]==='06'? parseInt(lot.cantidad.hembras) : 0,
              jul: lot.fecha_entrada.split('-')[1]==='07'? parseInt(lot.cantidad.hembras) : 0,
              ago: lot.fecha_entrada.split('-')[1]==='08'? parseInt(lot.cantidad.hembras) : 0,
              sep: lot.fecha_entrada.split('-')[1]==='09'? parseInt(lot.cantidad.hembras) : 0,
              oct: lot.fecha_entrada.split('-')[1]==='10'? parseInt(lot.cantidad.hembras) : 0,
              nov: lot.fecha_entrada.split('-')[1]==='11'? parseInt(lot.cantidad.hembras) : 0,
              dic: lot.fecha_entrada.split('-')[1]==='12'? parseInt(lot.cantidad.hembras) : 0,
              balance: parseInt(lot.cant_gallinas_asignadas) - parseInt(lot.cantidad.hembras),
              importacion: parseInt(lot.cantidad.hembras),
              asignacion: parseInt(lot.cant_gallinas_asignadas)
            })
          });
          row.forEach(el=>{
            this.importacion += el.importacion;
          });
          this.calendar = [
            row.map(el=> el.jan).reduce((p,c)=>  p+c ),
            row.map(el=> el.feb).reduce((p,c)=>  p+c ),
            row.map(el=> el.mar).reduce((p,c)=>  p+c ),
            row.map(el=> el.apr).reduce((p,c)=>  p+c ),
            row.map(el=> el.may).reduce((p,c)=>  p+c ),
            row.map(el=> el.jun).reduce((p,c)=>  p+c ),
            row.map(el=> el.jul).reduce((p,c)=>  p+c ),
            row.map(el=> el.ago).reduce((p,c)=>  p+c ),
            row.map(el=> el.sep).reduce((p,c)=>  p+c ),
            row.map(el=> el.oct).reduce((p,c)=>  p+c ),
            row.map(el=> el.nov).reduce((p,c)=>  p+c ),
            row.map(el=> el.dic).reduce((p,c)=>  p+c ),
          ];
          return row;
      }))
    })).subscribe(rows =>{ 
      this.rows = [...rows]
    });
  }

  getMonth(i){
    let months = this.cols.map(m=> m.header ).filter((m,i)=> i>1);
    return months[i];
  }

  selected(event){}

  setYear(value){
    this.year.next(new Date(value).getFullYear());
  }

}
