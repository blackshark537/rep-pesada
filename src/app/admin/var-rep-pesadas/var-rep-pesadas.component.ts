import { Component, OnDestroy, OnInit } from '@angular/core';
import { LotsEffects } from 'src/app/effects';

@Component({
  selector: 'app-var-rep-pesadas',
  templateUrl: './var-rep-pesadas.component.html',
  styleUrls: ['./var-rep-pesadas.component.scss'],
})
export class VarRepPesadasComponent implements OnInit,OnDestroy {

  variable_mortalidad_recria = 0;
  variable_mortalidad_recria_ajustado = 0;
  variable_mortalidad_produccion = 0;
  variable_mortalidad_produccion_ajustado = 0;

  variable_produccion_huevos_totales = 0;
  variable_aprovechamiento_huevos = 0;
  variable_nacimientos = 0;

  semanas_en_recria = 24;
  semanas_en_recria_real = 24;

  semanas_en_produccion = 41;
  semanas_en_produccion_real = 41;

  segment='table'
  displayVariables= true;
  
  cols=[
    { prop: 'mortalidad_std', header: 'Estandar de<br>Mortalidad Prod.' },
    { prop: 'mortalidad_real', header: 'Ajuste de<br>Mortalidad Prod.' },
    { prop: 'prod_real', header: 'Estandar de<br>Prod. Real' },
    { prop: 'prod', header: 'Estandar de<br>Prod. Ajustado' },
    { prop: 'aprov_real', header: 'Estandar de<br>Aprov. Real' },
    { prop: 'aprov', header: 'Estandar de<br>Aprov. Ajustado' },
    { prop: 'nac_real', header: 'Estandar de<br>Nac. Real' },
    { prop: 'nac', header: 'Estandar de<br>Nac. Ajustado' },
  ]
  row=[];
  hasChange=false;

  colorScheme = {
    domain: ['#023859', '#038C8C', '#D98E04','#F2811D', '#F26716', '#BF1515']
  };
  viewArea: number[] = [window.innerWidth, window.innerHeight-50];
  legend: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Semanas';
  yAxisLabel: string = 'Estandares De Producción';
  timeline: boolean = true;
  multi=[{
    name: 'Producción STD',
    series:[]
  },{
    name: 'Producción Ajust.',
    series:[]
  },{
    name: 'Aprovechamiento STD',
    series:[]
  },{
    name: 'Aprovechamiento Ajust.',
    series:[]
  },{
    name: 'Nacimientos STD',
    series:[]
  },{
    name: 'Nacimientos Ajust.',
    series:[]
  }
]

  constructor(
    private effectService: LotsEffects
  ) { }

  ngOnInit() {
    this.segment='table';
    this.variable_mortalidad_recria = this.effectService.variable_mortalidad_recria;
    this.variable_mortalidad_recria_ajustado = this.effectService.variable_mortalidad_recria_ajustado;

    this.variable_mortalidad_produccion = this.effectService.variable_mortalidad_produccion;
    this.variable_mortalidad_produccion_ajustado = this.effectService.variable_mortalidad_produccion_ajustado;

    this.variable_produccion_huevos_totales = this.effectService.variable_produccion_huevos_totales;
    this.variable_aprovechamiento_huevos = this.effectService.variable_aprovechamiento_huevos;
    this.variable_nacimientos = this.effectService.variable_nacimientos;
    this.semanas_en_produccion_real = this.effectService.semanas_en_produccion_real;
    this.row=[];
    let recria = [];

    for(let i=0; i< this.effectService._PROD.length; i++){
      
      const el = this.effectService._PROD[i];
      const aprov=this.effectService._APROV[i];
      const nac = this.effectService._Nac[i];

      const media = this.semanas_en_produccion_real>this.semanas_en_produccion? this.semanas_en_produccion_real : this.semanas_en_produccion;
      if(i >= media){
        break;
      }

      const id = i + 24;

      const percent_real = recria[i - 1]?.mortality_real || 100;
      const percent_std = recria[i - 1]?.mortality_std || 100;

      const mortality_real = i>0? (percent_real - (this.variable_mortalidad_produccion_ajustado/this.semanas_en_produccion)):100;
      const mortality_std = i>0? (percent_std - (this.variable_mortalidad_produccion/this.semanas_en_produccion)): 100;

      this.row.push({
        id,
        mortalidad_std: i<this.semanas_en_produccion? mortality_std.toFixed(1) : "",
        mortalidad_real: i<this.semanas_en_produccion_real? mortality_real.toFixed(1) : "",
        prod_real: el,
        prod: (el-(el*this.variable_produccion_huevos_totales/100)).toFixed(2),
        aprov_real: aprov,
        aprov: (aprov - (aprov*this.variable_aprovechamiento_huevos/100)).toFixed(2),
        nac_real: nac,
        nac: (nac - (nac*this.variable_nacimientos/100)).toFixed(2)
      });

      recria.push({mortality_real, mortality_std});

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
    }

  }

  ngOnDestroy(){
    if(this.hasChange) location.href = '/'
  }

  selectView(view){
    this.segment=view;
  }

  selected($event) {}

}
