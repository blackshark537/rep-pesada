import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppModel } from 'src/app/models';
import { ApiService } from 'src/app/services';

@Component({
  selector: 'app-lightbreeder-bar-graph',
  templateUrl: './lightbreeder-bar-graph.component.html',
  styleUrls: ['./lightbreeder-bar-graph.component.scss'],
})
export class LightbreederBarGraphComponent implements OnInit {
  
  actual_year= new Date().getFullYear();
  year= new BehaviorSubject(this.actual_year);
  //single: any[]=[];
  multi: any[]=[{
    name: '',
    series:[
      {
        name: 'Enero',
        value: 0
      },
      {
        name: 'Febrero',
        value: 0
      },
      {
        name: 'Marzo',
        value: 0
      },
      {
        name: 'Abril',
        value: 0
      },
      {
        name: 'Mayo',
        value: 0
      },
      {
        name: 'Junio',
        value: 0
      },
      {
        name: 'Julio',
        value: 0
      },
      {
        name: 'Agosto',
        value: 0
      },
      {
        name: 'Septiembre',
        value: 0
      },
      {
        name: 'Octubre',
        value: 0
      },
      {
        name: 'Noviembre',
        value: 0
      },
      {
        name: 'Diciembre',
        value: 0
      }
    ]
  }];
  show=false;
  view: any[] = [window.innerWidth-100, window.innerHeight-140];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Meses';
  showYAxisLabel = true;
  yAxisLabel = 'Importacion';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.multi[0].series.forEach(el => {
      el.value=0;
    });
    this.show=false;
    this.year.pipe(
      switchMap(year =>{
      this.yAxisLabel = `Importacion - ${year}`;
      return this.apiService.getLotsByYear(year).pipe(
        map(lots=>{
          let row = [];
          lots.forEach( (lot,i) => {  
            row.push(          {
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
              dec: lot.fecha_entrada.split('-')[1]==='12'? parseInt(lot.cantidad.hembras) : 0,
              balance: parseInt(lot.cant_gallinas_asignadas) - parseInt(lot.cantidad.hembras),
              asignacion: parseInt(lot.cant_gallinas_asignadas)
            })
          });
          return row;
      }))
    })).subscribe(rows => {
        console.log(rows)
        rows.forEach(r=>{
          this.multi[0].series[0].value += r.jan
          this.multi[0].series[1].value += r.feb
          this.multi[0].series[2].value += r.mar
          this.multi[0].series[3].value += r.apr
          this.multi[0].series[4].value += r.may
          this.multi[0].series[5].value += r.jun
          this.multi[0].series[6].value += r.jul
          this.multi[0].series[7].value += r.ago
          this.multi[0].series[8].value += r.sep
          this.multi[0].series[9].value += r.oct
          this.multi[0].series[10].value += r.nov
          this.multi[0].series[11].value += r.dec
        })
        //this.xAxisLabel = r.empresa
        this.show=true;
    });
  }

  setYear(value){
    this.year.next(new Date(value).getFullYear());
    this.ngOnInit()
  }
}
