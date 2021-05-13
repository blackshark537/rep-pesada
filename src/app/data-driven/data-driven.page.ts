import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from '../services';

@Component({
  selector: 'app-data-driven',
  templateUrl: './data-driven.page.html',
  styleUrls: ['./data-driven.page.scss'],
})
export class DataDrivenPage implements OnInit {
  year = new BehaviorSubject(new Date().getFullYear());
  rows = [];
  cols  = [
    {prop: 'empresa', header:'Empresa y/o Productor'},
    {prop: 'entrydate', header:'Fecha de<br>Entrada'},
    {prop: 'asignacion', header:'Rep. Livianas<br>Asignadas'},
    {prop: 'importadas', header:'Rep. Livianas<br>Importadas'},
    {prop: 'balance', header:'Balance'},
    //{prop: 'cuota_asignacion', header:'Part. de<br>Asignación % '},
    {prop: 'cuota_importacion', header:'% Part. de<br>Importación'},
  ]
  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.year.pipe( 
      switchMap(year =>{
        return this.apiService.getLotsByYear(year).pipe(
          map(lots=>{
            let asignacionTotal = 0
            let importacionTotal = 0
            let row = [];

            lots.forEach(lot=>{
              asignacionTotal+=parseInt(lot.empresa?.cant_gallinas_asignadas)
              importacionTotal+=parseInt(lot.cantidad.hembras)
            });
      
            lots.forEach((lot, i)=>{
              row.push({
                id:i+1,
                empresa: lot?.empresa?.nombre_comercial,
                entrydate: new Date(lot.fecha_entrada).toLocaleDateString(),
                asignacion: lot.empresa?.cant_gallinas_asignadas,
                importadas: lot.cantidad.hembras,
                cuota_asignacion: ((parseInt(lot.empresa?.cant_gallinas_asignadas)/asignacionTotal)*100).toFixed(2),
                cuota_importacion:  ((parseInt(lot.cantidad.hembras)/importacionTotal)*100).toFixed(2),
                balance: parseInt(lot.empresa?.cant_gallinas_asignadas)-parseInt(lot.cantidad.hembras)
              });
            });
            return row;
          })
        );
    })).subscribe(rows => this.rows = rows);
  }

  setYear(value){
    this.year.next(new Date(value).getFullYear());
  }

  selected(evt){
  }
}
