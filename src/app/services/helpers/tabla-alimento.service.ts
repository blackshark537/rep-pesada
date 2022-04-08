import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatatableService, TypeFilter } from './datatable.service';
import { addDays, differenceInDays } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class TablaAlimentoService {
  private ALIM_STD=[9,10,11,15,19,23,27,31,35,41,44,49,54,59,65,71,76,83,89,93,99,103,109,114,118,124,130,135,140,144,149,153,158,161,165,168,171,174,178,176,180,181,182,183,184,183,184,185];
  private eficiency = 10;
  private mortality = 10;

  private cols = [
    { prop: 'day', header: 'Día' },
    { prop: 'date', header: 'Fecha' },
    { prop: 'std_alimento', header: 'STD. \nDe Alimento' },
    { prop: 'efficiency', header: 'Var. De \nEficiencia' },
    { prop: 'mortality', header: 'Mortalidad' },
    { prop: 'chicks', header: 'Aves' },
    { prop: 'daily_consumption', header: 'Consumo Diario' },
    { prop: 'pre', header: 'Pre-Iniciador\nDe 0-10 Días' },
    { prop: 'ini', header: 'Iniciador\nDe 10-21 Días' },
    { prop: 'cre', header: 'Crecimiento\nDe 22-34 Días' },
    { prop: 'eng', header: 'Engorde\nDe 35-42 Días' },
    { prop: 'fin', header: 'Finalizador\nDe 43-45 Días' },
  ];

  private datatable = [];
  private sub$: Subscription[]= [];
  private dateNow = new Date();
  private months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dec'];

  constructor(
    private datatableService: DatatableService
  ) { }

  getCols(){
    return this.cols;
  }

  getDataTable(){
    return this.datatable;
  }

  async compileTable(){
    this.datatable = [];
    const pollos = await this.getPollitosNacidos();
    let mortalities = [100];
    for(let i=1; i<=45; ++i){
      let obj={};
      const mort = mortalities[i-1];
      const mortality = this.toFixed(mort-this.mortality/45);
      const efficiency = this.ALIM_STD[i-1] - ( this.ALIM_STD[i-1] * this.eficiency)/100;
      obj['id'] = i-1;
      obj['day'] = i;
      obj['date'] = addDays(this.dateNow, i);
      obj['std_alimento'] = this.ALIM_STD[i-1];
      obj['efficiency'] =  efficiency
      obj['mortality'] = mortality;
      obj['chicks'] = Math.floor(pollos - (pollos * (100 - mortality)/100));

      const daily_consumption = this.toFixed( pollos * efficiency /454/100);
      const consumption = this.toFixed(obj['chicks'] * efficiency /454/100);
      obj['daily_consumption'] =  daily_consumption;

      const dt = differenceInDays( obj['date'], this.dateNow);

      obj['pre'] = dt >= 0 && dt <= 7? consumption : 0;
      obj['ini'] = dt >= 8 && dt <= 21? consumption : 0;
      obj['cre'] = dt >=22 && dt <= 34? consumption : 0;
      obj['eng'] = dt >=35 && dt <= 42? consumption : 0;
      obj['fin'] = dt >=43 && dt <= 45? consumption : 0;

      mortalities.push(mortality);
      this.datatable.push(obj);
    }
  }

  getPollitosNacidos(): Promise<number>{
    return new Promise((res, rej)=>{
      let pollos_recibidos = 0;
      const sub2 = this.datatableService.getReproductorasData(this.dateNow.getFullYear(), 'produccion', TypeFilter.Nacimientos, false).subscribe(resp=>{
        pollos_recibidos = resp.datatable[this.dateNow.getDate()-1][this.months[this.dateNow.getMonth()]];
        res(pollos_recibidos);
      });
      this.sub$.push(sub2);
    })
  }

  clear(){
    this.sub$.map(sub=> sub.unsubscribe());
  }

  private toFixed(value: number, decimals = 2){
    return parseFloat(value.toFixed(decimals));
  }
}
