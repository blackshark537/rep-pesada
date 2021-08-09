import { Component, OnDestroy, OnInit } from '@angular/core';
//import { Store } from '@ngrx/store';
//import { AppModel } from 'src/app/models';
import { LotService } from 'src/app/services';
//import { eggLotsActions, LotsActions } from '../../actions'

@Component({
  selector: 'app-var-rep-abuelas',
  templateUrl: './var-rep-abuelas.component.html',
  styleUrls: ['./var-rep-abuelas.component.scss'],
})
export class VarRepAbuelasComponent implements OnInit, OnDestroy {

  variable_mortalidad_recria = parseInt(localStorage.getItem('variable_mortalidad_recria')) || 6;
  variable_mortalidad_produccion = parseInt(localStorage.getItem('variable_mortalidad_produccion')) || 14;
  variable_produccion_huevos_totales = parseInt(localStorage.getItem('variable_produccion_huevos_totales')) || 2;
  variable_aprovechamiento_huevos = parseInt(localStorage.getItem('variable_aprovechamiento_huevos')) || 2;
  variable_nacimientos = parseInt(localStorage.getItem('variable_nacimientos')) || 2;
  semanas_en_recria = 24;
  semanas_en_produccion = 42;
  segment='table'

  cols = [
    { prop: 'prod_real', header: 'Estandar de<br>Prod. Real' },
    { prop: 'prod', header: 'Estandar de<br>Prod. Ajustado' },
    { prop: 'aprov_real', header: 'Estandar de<br>Aprov. Real' },
    { prop: 'aprov', header: 'Estandar de<br>Aprov. Ajustado' },
    { prop: 'nac_real', header: 'Estandar de<br>Nac. Real' },
    { prop: 'nac', header: 'Estandar de<br>Nac. Ajustado' },
  ]
  row = [];
  hasChange = false;

  colorScheme = {
    domain: ['#023859', '#038C8C', '#D98E04', '#F2811D', '#F26716', '#BF1515']
  };
  viewArea: number[] = [window.innerWidth, window.innerHeight - 50];
  legend: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Semanas';
  yAxisLabel: string = 'Estandares De Producción';
  timeline: boolean = true;
  multi = [{
    name: 'Producción Real',
    series: []
  }, {
    name: 'Producción Ajust.',
    series: []
  }, {
    name: 'Aprovechamiento Real',
    series: []
  }, {
    name: 'Aprovechamiento Ajust.',
    series: []
  }, {
    name: 'Nacimientos Real',
    series: []
  }, {
    name: 'Nacimientos Ajust.',
    series: []
  }
  ]

  constructor(
    private lotService: LotService,
    //private store: Store<AppModel>
  ) { }

  ngOnInit() {
    this.segment='table';
    this.variable_mortalidad_recria = parseInt(localStorage.getItem('variable_mortalidad_recria')) || 0;
    this.variable_mortalidad_produccion = parseInt(localStorage.getItem('variable_mortalidad_produccion')) || 0;
    this.variable_produccion_huevos_totales = parseInt(localStorage.getItem('variable_produccion_huevos_totales')) || 0;
    this.variable_aprovechamiento_huevos = parseInt(localStorage.getItem('variable_aprovechamiento_huevos')) || 0;
    this.variable_nacimientos = parseInt(localStorage.getItem('variable_nacimientos')) || 0;
    this.row=[];
    this.lotService._PROD.forEach((el,i)=>{
      let aprov = this.lotService._APROV[i];
      let nac = this.lotService._Nac[i];
      i+=24;
      this.row.push({
        id:i,
        prod_real: el, 
        prod: (el - (el * this.variable_produccion_huevos_totales / 100)).toFixed(2),
        aprov_real: aprov,
        aprov: (aprov - (aprov * this.variable_aprovechamiento_huevos / 100)).toFixed(2),
        nac_real: nac,
        nac: (nac - (nac * this.variable_nacimientos / 100)).toFixed(2)
      });

      this.multi[0].series.push({
        name: 'semana-'+i,
        value:el
      });
      this.multi[1].series.push({
        name: 'semana-'+i,
        value:el-(el*this.variable_produccion_huevos_totales/100)
      });
      this.multi[2].series.push({
        name: 'semana-'+i,
        value:aprov
      });
      this.multi[3].series.push({
        name: 'semana-'+i,
        value:aprov - (aprov*this.variable_aprovechamiento_huevos/100)
      });
      this.multi[4].series.push({
        name: 'semana-'+i,
        value:nac
      });
      this.multi[5].series.push({
        name: 'semana-'+i,
        value:nac - (nac*this.variable_nacimientos/100)
      });

    });
  }

  ngOnDestroy(){
    if(this.hasChange) location.href  = '/';
  }

  selectView(view){
    this.segment=view;
  }

  selected($event) {}

  ajustar(){
    localStorage.setItem('variable_mortalidad_recria', this.variable_mortalidad_recria.toString())
    localStorage.setItem('variable_mortalidad_produccion', this.variable_mortalidad_produccion.toString())
    localStorage.setItem('variable_produccion_huevos_totales', this.variable_produccion_huevos_totales.toString())
    localStorage.setItem('variable_aprovechamiento_huevos', this.variable_aprovechamiento_huevos.toString())
    localStorage.setItem('variable_nacimientos', this.variable_nacimientos.toString())
    this.hasChange=true;
    this.ngOnInit();
  }
}
