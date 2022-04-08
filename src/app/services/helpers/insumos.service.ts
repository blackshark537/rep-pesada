import { Injectable } from '@angular/core';
import { CostsService } from './costs.service';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {

  macros: iMacrosObj = {
    dolar: {price: 0, price_dop: 0, name: 'Dolar'},
    maiz: {price: 0, price_dop: 0, name: 'maíz'},
    soya: {price: 0, price_dop: 0, name: 'soya'},
    aceite_soya: {price: 100, price_dop: 0, name: 'aceite de soya'},
    calcio: {price: 2.67, price_dop: 0, name: 'calcio'},
    sal_molida: {price: 8, price_dop: 0, name: 'sal molida'},
    puntilla_arroz: {price: 9, price_dop: 0, name: 'puntilla de arroz'},
    grasa_vegetal: {price: 70, price_dop: 0, name: 'grasa vegetal'},
  };

  otros: iMacrosObj = {
    elaboracion: {price: 0.63, price_dop: 0, name: 'Costos De Elaboración'},
    fundas: {price: 0.39, price_dop: 0, name: 'Costos Por Fundas'},
    etiquetas: {price: 0.01, price_dop: 0, name: 'Costos Por Etiquetas'},
    utilidad: {price: 8, price_dop: 0, name: 'Costo De Maquilación'},
    indirectos: {price: 1.04, price_dop: 0, name: 'Costos Indirectos'},
  }

  micros: iMicrosObj = {
    fersafos: {price: 40, price_dop: 0, name: 'fersafos', qty: 100},//fosforo y minerales
    mycosord: {price: 158.44, price_dop: 0, name: 'mycosorb', qty: 55}, //micotoxinas reducer
    methionina: {price: 118.14, price_dop: 0, name: 'methionina', qty: 55}, //amino
    premezcla: {price: 65.93, price_dop: 0, name: 'pre-mezcla', qty: 55}, //premezcla de minerales
    lisina: {price: 63.91, price_dop: 0, name: 'lisina', qty: 55}, //amino
    colina: {price: 27, price_dop: 0, name: 'cloruro de colina', qty: 55}, // Vit B4
    lincomix: {price: 112.15, price_dop: 0, name: 'lincomix', qty: 55}, // anti bacterial
    treonina: {price: 61.21, price_dop: 0, name: 'treonina', qty: 55}, //amino
    cu_so: {price: 64, price_dop: 0, name: 'Sulfato de cobre', qty: 55}, //desinfectante
    colistina: {price: 184.696, price_dop: 0, name: 'colistina', qty: 55}, //anti bio
    lonomicin_mn: {price: 183.01, price_dop: 0, name: 'lonomicin mn', qty: 55},// anti coccidiosis 
    myco_ad: {price: 16.49, price_dop: 0, name: 'myco AD', qty: 55},//micotoxinas reducer
    sacox: {price: 129.81, price_dop: 0, name: 'sacox', qty: 55},//anticoccidial
  }
  
  constructor(
    private costsService: CostsService
  ) { }

  async getMacros(): Promise<iMacros[]>{
    const maiz = await this.costsService.getMaizTable();
    const soya = await this.costsService.getSoyaTable();
    const dolar = this.costsService.getDollar();
    this.macros['dolar'].price = dolar;
    this.macros['maiz'].price = maiz[maiz.length-4].value;
    this.macros['soya'].price = soya[soya.length-4].value;
    this.macros['maiz'].price_dop = maiz[maiz.length-4].value * dolar;
    this.macros['soya'].price_dop = soya[soya.length-4].value * dolar;
    return Object.values(this.macros);
  }

  getMicros(): iMicros[]{
    return Object.values(this.micros);
  }

  getOtros(): iMacros[]{
    return Object.values(this.otros);
  }

  get dateNow(): Date{
    return this.costsService.dateNow;
  }

  unsubscribe(): void{
    this.costsService.unsubscribe();
  }
}


interface iMicrosObj{
  [name: string]: iMicros
}

interface iMacrosObj{
  [name: string]: iMacros
}

interface iMacros{price: number; price_dop: number; name: string };
interface iMicros{price: number; price_dop: number; name: string, qty: number};