import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LotInterface } from 'src/app/models';
import Lots from 'src/assets/data/lot.json';
import { BrowserService } from '../helpers/browser.service';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  lot$ = new BehaviorSubject<LotProdInterface>(null);
  
  //lots$ = new BehaviorSubject<LotInterface[]>(null);

  cols$ = new BehaviorSubject([
  //{ prop: 'Lot' }, 
  //{ prop: 'Entry'},
  {prop: 'Business'},
  { prop: 'Females' },
  //{ prop: 'Mort'}
  //{ prop: 'Enviroment' }, 
  //{ prop: 'Race' }, 
  
  { prop: 'Days' }, 
  { prop: 'Week'},
  { prop: 'prodStart' }, 
  //{ prop: 'Total' }
  ]);

  colsRecria$ = new BehaviorSubject([
    //{ prop: 'Lot' }, 
    //{ prop: 'Entry'},
    { prop: 'Week'},
    //{prop: 'Business'},
    { prop: 'Chicks' },
    { prop: 'Mort'}
    //{ prop: 'Enviroment' }, 
    //{ prop: 'Race' }, 
    
    //{ prop: 'Days' }, 
    //{ prop: 'Males' }, 
    //{ prop: 'Total' }
    ]);

  constructor(
    private helperService: BrowserService
  ) { 
  }

  getRecria(lote){
    let recria=[];
    const total_weeks=18;
    for (let i = 0; i < total_weeks; i++) {

      const {business, week, lot, mort, mortp, date, females} = lote;
      
      const percent = recria[i-1]?.mort || 100;
      const mortality = percent-(mort / total_weeks);
      const date1 = new Date(date.getTime()+(7*24*60*60*1000))
      const date2 = new Date(date1.getTime()+((7 * 24 * 60 * 60 * 1000)*i));

      recria.push({
        id:  i,
        business,
        week:i+1,
        weekIndx: week,
        lot,
        mort: Math.round(mortality*100)/100,
        mortp,
        entry: date2,
        chicks: Math.round(females - ((100-mortality)*10)),
      });
    }
    return recria;
  }

  getProd(lote){
    let prod=[];
    const total_weeks=67;
    for (let i = 0; i < total_weeks; i++) {

      const {business, week, lot, entry, chicks, mortp} = lote;
      
      const percent = prod[i-1]?.mort || 100;
      const mortality = percent-(mortp / total_weeks);

      const date1 = new Date(entry.getTime()+(7*8*24*60*60*1000))//add 9+1 weeks
      const date2 = new Date(date1.getTime()+((7 * 24 * 60 * 60 * 1000)*i));

      prod.push({
        id:  i,
        business,
        week:lote.week+i+8,//add 8+i weeks
        weekIndx: week,
        lot,
        mort:  Math.round(mortality*100)/100 ,
        entry: date2,
        chicks: Math.round(chicks - ((100-mortality)*10)),
      });
    }
    return prod;
  }

  getLots(){
    return Lots.map(Lote =>{
      const {
        id, lote, codigo_aduanero, raza,
        fecha_entrada, 
        variable_mortalidad_recria,
        variable_mortalidad_produccion
      } = Lote;
      
      const { hembras, machos } = Lote.cantidad;
      const { ambiente } = Lote.capacidad_instalada;
      const { nombre_comercial } = Lote.empresa;
      
      //has to  add one day
      const date1= this.formatDate(fecha_entrada);
      const date2= new Date(Date.now());
      return {
        id,
        business: nombre_comercial,
        lot: lote,
        date: date1,
        code: codigo_aduanero,
        mort: variable_mortalidad_recria,
        mortp: variable_mortalidad_produccion,
        race: raza,
        enviroment: ambiente,
        entry: date1,
        week: this.weeksBetween(date1, date2),
        days: this.daysBetween(date1,date2),
        prodStart: this.initProd(date1),
        females: parseInt(hembras),
        males: parseInt(machos),
        total: parseInt(hembras)+parseInt(machos)
      }
    });
  }

  async deleteLot(lot: LotInterface){
      const resp = await this.helperService.Confirm('Confirm to delete this', 'Delete');
      if(resp){
        console.log('delete', lot.id);
      }
  }

  private formatDate(date: string){
    //has to add one day
    return new Date(new Date(date).getTime()  + (24 * 60 * 60 * 1000))
  }

  private initProd(date: Date){
    return new Date(date.getTime()+((1000 * 3600 * 24)*175))
  }

  private weeksBetween(d1, d2) {
    return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000))+1;
  }

  private daysBetween(d1,d2) {
    const Difference_In_Time = d2.getTime() - d1.getTime();
    return Math.floor(Difference_In_Time / (1000 * 3600 * 24));
  }
}

export interface LotProdInterface{
  id: number;
  code: string;
  lot: string;
  enviroment: string;
  race: string;
  date: string;
  days: number;
  females: number;
  males: number;
  total: number;
  week: number;
  "variable_mortalidad_recria": number;
  "variable_mortalidad_produccion": number;
  "variable_produccion_huevos_totales": number;
  "variable_aprovechamiento_huevos": number;
  "variable_nacimiento": number;
}