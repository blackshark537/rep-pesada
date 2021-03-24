import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LotInterface } from 'src/app/models';
import Lots from 'src/assets/data/lot.json';
import { BrowserService } from '../helpers/browser.service';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  lot$ = new BehaviorSubject<LotProdInterface>(null);

  //lots$ = new BehaviorSubject<LotInterface[]>(null);

  cols$ = new BehaviorSubject([{ prop: 'Lot' }, 
  { prop: 'Enviroment' }, 
  { prop: 'Race' }, 
  { prop: 'Days' }, 
  { prop: 'Week'},
  /* { prop: 'Females' }, 
  { prop: 'Males' },  */
  { prop: 'Total' }]);

  constructor(
    private helperService: BrowserService
  ) { }

  getLots(){
    return Lots.map(l =>{
      const {id, lote, codigo_aduanero, raza, fecha_entrada} = l;
      const { hembras, machos } = l.cantidad;
      const { ambiente } = l.capacidad_instalada;
      return {
        id,
        lot: lote,
        code: codigo_aduanero,
        race: raza,
        enviroment: ambiente,
        //entry: fecha_entrada,
        week: Math.floor((new Date().getDate() - parseInt(fecha_entrada.split('-')[2]))/8)+1,
        days: new Date().getDate() - parseInt(fecha_entrada.split('-')[2]),
        females: hembras,
        males: machos,
        total: (parseInt(hembras)+parseInt(machos)) + ' Chicks'
      }
    });
  }

  async deleteLot(lot: LotInterface){
      const resp = await this.helperService.Confirm('Confirm to delete this', 'Delete');
      if(resp){
        console.log('delete', lot.id);
      }
  }
}

export interface LotProdInterface{
  code: string;
  days: number;
  enviroment: string;
  females: string;
  id: number;
  lot: string;
  males: string;
  race: string;
  total: string;
  week: number;
}