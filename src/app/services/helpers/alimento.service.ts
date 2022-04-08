import { Injectable } from '@angular/core';
import { InsumosService } from './insumos.service';

@Injectable({
  providedIn: 'root'
})
export class AlimentoService {

  private cols =[
    { prop: 'name', header: 'Ingredientes' },
    { prop: 'qty', header: 'Cantidad (lbs)' },
    { prop: 'percent', header: '%' },
    { prop: 'amount', header: 'Contenido (lbs)' },
    { prop: 'price', header: 'Costo (funda)' },
    { prop: 'price_lb', header: 'Costo (lbs)' },
    { prop: 'price_ton_usd', header: 'Costo Tonelada (usd)' },
    { prop: 'price_ton_dop', header: 'Costo Tonelada (peso)' },
  ];

  private nucleo_pre=[
    {name: '', prop: 'fersafos', qty: 0, percent: 1.6500, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'mycosord', qty: 0, percent: 0.1000, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'methionina', qty: 0, percent: 0.3048, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'premezcla', qty: 0, percent: 0.3000, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'lisina', qty: 0, percent: 0.1702, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'colina', qty: 0, percent: 0.1000, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'lincomix', qty: 0, percent: 0.0190, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'treonina', qty: 0, percent: 0.0526, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'cu_so', qty: 0, percent: 0.0500, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'colistina', qty: 0, percent: 0.0275, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'lonomicin_mn', qty: 0, percent: 0.0500, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
  ];
  private pre = [
    {name: '', prop: 'maiz', qty: 0, percent: 52.60, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'soya', qty: 0, percent: 38.16, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'aceite_soya', qty: 0, percent: 4.02, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'calcio', qty: 0, percent: 1.92, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'sal_molida', qty: 0, percent: 0.49, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'nucleo', qty: 0, percent: 0, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
  ];

  private nucleo_ini=[
    {name: '', prop: 'fersafos', qty: 0, percent: 1.6500, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'mycosord', qty: 0, percent: 0.1000, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'methionina', qty: 0, percent: 0.2521, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'premezcla', qty: 0, percent: 0.3000, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'lisina', qty: 0, percent: 0.0287, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'colina', qty: 0, percent: 0.1000, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'lincomix', qty: 0, percent: 0.0185, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'treonina', qty: 0, percent: 0.0675, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'cu_so', qty: 0, percent: 0.0500, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'colistina', qty: 0, percent: 0.0275, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'lonomicin_mn', qty: 0, percent: 0.0500, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
  ];
  private ini = [
    {name: '', prop: 'maiz', qty: 0, percent: 51.48, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'soya', qty: 0, percent: 38.66, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'grasa_vegetal', qty: 0, percent: 4.92, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'calcio', qty: 0, percent: 1.80, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'sal_molida', qty: 0, percent: 0.49, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'nucleo', qty: 0, percent: 0, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
  ];

  private nucleo_cre=[
    {name: '', prop: 'fersafos', qty: 0, percent: 1.4400, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'mycosord', qty: 0, percent: 0.1000, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'methionina', qty: 0, percent: 0.3072, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'premezcla', qty: 0, percent: 0.2500, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'lisina', qty: 0, percent: 0.1488, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'colina', qty: 0, percent: 0.1000, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'lincomix', qty: 0, percent: 0.0155, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'treonina', qty: 0, percent: 0.0724, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'cu_so', qty: 0, percent: 0.0500, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'colistina', qty: 0, percent: 0.0210, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'lonomicin_mn', qty: 0, percent: 0.0500, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
  ];
  private cre = [
    {name: '', prop: 'maiz', qty: 0, percent: 59.96, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'soya', qty: 0, percent: 30.69, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'grasa_vegetal', qty: 0, percent: 4.59, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'calcio', qty: 0, percent: 1.77, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'sal_molida', qty: 0, percent: 0.44, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'nucleo', qty: 0, percent: 0, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
  ];

  private nucleo_eng=[
    {name: '', prop: 'fersafos', qty: 0, percent: 1.2000, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'myco_ad', qty: 0, percent: 0.2500, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'methionina', qty: 0, percent: 0.2147, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'premezcla', qty: 0, percent: 0.2000, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'lisina', qty: 0, percent: 0.1052, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'colina', qty: 0, percent: 0.1000, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'lincomix', qty: 0, percent: 0.0130, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'treonina', qty: 0, percent: 0.0725, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'cu_so', qty: 0, percent: 0.0500, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'colistina', qty: 0, percent: 0.0140, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'sacox', qty: 0, percent: 0.0500, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
  ];
  private eng = [
    {name: '', prop: 'maiz', qty: 0, percent: 62.46, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'soya', qty: 0, percent: 28.40, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'grasa_vegetal', qty: 0, percent: 4.69, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'calcio', qty: 0, percent: 1.74, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'sal_molida', qty: 0, percent: 0.44, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'nucleo', qty: 0, percent: 0, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
  ];

  private nucleo_fin=[
    {name: '', prop: 'fersafos', qty: 0, percent: 1.2000, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'methionina', qty: 0, percent: 0.1824, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'premezcla', qty: 0, percent: 0.2000, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'lisina', qty: 0, percent: 0.0884, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},    
    {name: '', prop: 'treonina', qty: 0, percent: 0.0678, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
  ];

  private fin = [
    {name: '', prop: 'maiz', qty: 0, percent: 64.87, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'soya', qty: 0, percent: 27.06, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'grasa_vegetal', qty: 0, percent: 4.14, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'calcio', qty: 0, percent: 1.75, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'sal_molida', qty: 0, percent: 0.44, amount: 100, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
    {name: '', prop: 'nucleo', qty: 0, percent: 0, amount: 0, price: 0, price_lb: 0, price_ton_usd: 0, price_ton_dop: 0},
  ];

  private total_alimento = {
    pre: {
      costo_quintal: {name: 'COSTO PARA 20 QQ ALIMENTO', usd: 0, dop: 0},
      costo_prod: {name: 'COSTO PRODUCCION POR QQ ALIMENTO', usd: 0, dop: 0},
      costo_elab: {name: 'COSTO ELABORACION ALIMENTO', usd: 0, dop: 0},
      costo_final: {name: 'COSTO TOTAL', usd: 0, dop: 0},
    },
    ini: {
      costo_quintal: {name: 'COSTO PARA 20 QQ ALIMENTO', usd: 0, dop: 0},
      costo_prod: {name: 'COSTO PRODUCCION POR QQ ALIMENTO', usd: 0, dop: 0},
      costo_elab: {name: 'COSTO ELABORACION ALIMENTO', usd: 0, dop: 0},
      costo_final: {name: 'COSTO TOTAL', usd: 0, dop: 0},
    },
    cre: {
      costo_quintal: {name: 'COSTO PARA 20 QQ ALIMENTO', usd: 0, dop: 0},
      costo_prod: {name: 'COSTO PRODUCCION POR QQ ALIMENTO', usd: 0, dop: 0},
      costo_elab: {name: 'COSTO ELABORACION ALIMENTO', usd: 0, dop: 0},
      costo_final: {name: 'COSTO TOTAL', usd: 0, dop: 0},
    },
    eng: {
      costo_quintal: {name: 'COSTO PARA 20 QQ ALIMENTO', usd: 0, dop: 0},
      costo_prod: {name: 'COSTO PRODUCCION POR QQ ALIMENTO', usd: 0, dop: 0},
      costo_elab: {name: 'COSTO ELABORACION ALIMENTO', usd: 0, dop: 0},
      costo_final: {name: 'COSTO TOTAL', usd: 0, dop: 0},
    },
    fin: {
      costo_quintal: {name: 'COSTO PARA 20 QQ ALIMENTO', usd: 0, dop: 0},
      costo_prod: {name: 'COSTO PRODUCCION POR QQ ALIMENTO', usd: 0, dop: 0},
      costo_elab: {name: 'COSTO ELABORACION ALIMENTO', usd: 0, dop: 0},
      costo_final: {name: 'COSTO TOTAL', usd: 0, dop: 0},
    }
  }

  private total_nucleo = {
    nucleo_pre: {
      costo_quintal: {name: 'Costo Para 20 QQ Alimento', usd: 0, dop: 0},
      costo_indirectos: {name: 'Costo Indirectos', usd: 0, dop: 0},
      subtotal: {name: 'SubTotal', usd: 0, dop: 0},
      utilidad: {name: 'Utilidad', usd: 0, dop: 0},
      costo_fundas: {name: 'Costos De Las Fundas', usd: 0, dop: 0},
      costo_etiquetas: {name: 'Costos De Las Etiquetas', usd: 0, dop: 0},
      costo_final: {name: 'Costo Total', usd: 0, dop: 0},
    },
    nucleo_ini: {
      costo_quintal: {name: 'Costo Para 20 QQ Alimento', usd: 0, dop: 0},
      costo_indirectos: {name: 'Costo Indirectos', usd: 0, dop: 0},
      subtotal: {name: 'SubTotal', usd: 0, dop: 0},
      utilidad: {name: 'Utilidad', usd: 0, dop: 0},
      costo_fundas: {name: 'Costos De Las Fundas', usd: 0, dop: 0},
      costo_etiquetas: {name: 'Costos De Las Etiquetas', usd: 0, dop: 0},
      costo_final: {name: 'Costo Total', usd: 0, dop: 0},
    },
    nucleo_cre: {
      costo_quintal: {name: 'Costo Para 20 QQ Alimento', usd: 0, dop: 0},
      costo_indirectos: {name: 'Costo Indirectos', usd: 0, dop: 0},
      subtotal: {name: 'SubTotal', usd: 0, dop: 0},
      utilidad: {name: 'Utilidad', usd: 0, dop: 0},
      costo_fundas: {name: 'Costos De Las Fundas', usd: 0, dop: 0},
      costo_etiquetas: {name: 'Costos De Las Etiquetas', usd: 0, dop: 0},
      costo_final: {name: 'Costo Total', usd: 0, dop: 0},
    },
    nucleo_eng: {
      costo_quintal: {name: 'Costo Para 20 QQ Alimento', usd: 0, dop: 0},
      costo_indirectos: {name: 'Costo Indirectos', usd: 0, dop: 0},
      subtotal: {name: 'SubTotal', usd: 0, dop: 0},
      utilidad: {name: 'Utilidad', usd: 0, dop: 0},
      costo_fundas: {name: 'Costos De Las Fundas', usd: 0, dop: 0},
      costo_etiquetas: {name: 'Costos De Las Etiquetas', usd: 0, dop: 0},
      costo_final: {name: 'Costo Total', usd: 0, dop: 0},
    },
    nucleo_fin: {
      costo_quintal: {name: 'Costo Para 20 QQ Alimento', usd: 0, dop: 0},
      costo_indirectos: {name: 'Costo Indirectos', usd: 0, dop: 0},
      subtotal: {name: 'SubTotal', usd: 0, dop: 0},
      utilidad: {name: 'Utilidad', usd: 0, dop: 0},
      costo_fundas: {name: 'Costos De Las Fundas', usd: 0, dop: 0},
      costo_etiquetas: {name: 'Costos De Las Etiquetas', usd: 0, dop: 0},
      costo_final: {name: 'Costo Total', usd: 0, dop: 0},
    },
  }

  
  constructor(
    private insumosService: InsumosService
  ){}

  getCols(){
    return this.cols;
  }

  getAlimento(alimentoType: string){
    return this[alimentoType].map((el, i)=> ({...el, id: i+1}));
  }

  getNucleo(nucleoType: string){
    return this[nucleoType].map((el, i)=> ({...el, id: i+1}));
  }

  getResumenTotal(alimentoType: string): iTotal[]{
    return Object.values(this.total_alimento[alimentoType]);
  }

  getResumenTotalNucleo(nucleoTyoe: string): iTotal[]{
    return Object.values(this.total_nucleo[nucleoTyoe]);
  }


  async compileResume(): Promise<void>{
    const alimentos = Object.values(AlimentoTypeId);
    await Promise.all(alimentos.map(async alim=>{
      await this.compileAlimento(alim);
    }));
  }

  async compileAlimento(type: string){
    switch (type) {
      case AlimentoTypeId.PRE:
       await this.computeAlimento('pre', 'nucleo_pre'); 
        break;
      case AlimentoTypeId.INI:
        await this.computeAlimento('ini', 'nucleo_ini');
        break;
      case AlimentoTypeId.CRE:
        await this.computeAlimento('cre', 'nucleo_cre');
        break;
      case AlimentoTypeId.ENG:
        await this.computeAlimento('eng', 'nucleo_eng');
        break;
      case AlimentoTypeId.FIN:
        await this.computeAlimento('fin', 'nucleo_fin');
        break;
      default:
        break;
    }
  }

  private async computeAlimento(alimentoType: string, nucleoType='nucleo_pre'){
    await this.insumosService.getMacros();
    await this.delay();
    const dolar = this.insumosService.macros['dolar']?.price;
    this[alimentoType].forEach(el=>{
      el.name = this.insumosService.macros[el.prop]?.name.toUpperCase() || 'NÚCLEO';
      el.qty = this.compQty(el.percent);
      el.price = this.toFixed(this.insumosService.macros[el.prop]?.price);
      el.price_lb = this.toFixed(el.price/el.amount, 3);
      el.price_ton_usd = this.toFixed(el.qty*el.price_lb);
      el.price_ton_dop = this.toFixed(el.price_ton_usd*dolar);
    });
    
    this.computeNucleo(nucleoType, dolar);
    this.computeTotalNucleo(nucleoType, dolar);
    const last = this[alimentoType].length-1;
    this[alimentoType][last].qty = this.toFixed(this[nucleoType].map(el=> el.qty).reduce((p,c)=> p+=c, 0));
    this[alimentoType][last].percent = this.toFixed(this[nucleoType].map(el=> el.percent).reduce((p,c)=> p+=c, 0));
    this[alimentoType][last].amount = this.toFixed(this[nucleoType].map(el=> el.qty).reduce((p,c)=> p+=c, 0));
    this[alimentoType][last].price = this.toFixed(this.total_nucleo[nucleoType].costo_final.usd);
    this[alimentoType][last].price_lb = this.toFixed(this[alimentoType][last].price/this[alimentoType][last].amount, 3)
    this[alimentoType][last].price_ton_usd = this.toFixed(this.total_nucleo[nucleoType].costo_final.usd);
    this[alimentoType][last].price_ton_dop = this.toFixed(this.total_nucleo[nucleoType].costo_final.usd * dolar);
    
    this.computeTotalAlimento(alimentoType, dolar)
  }

  private computeNucleo(typeNucleo: string,dolar: number){
    this[typeNucleo].forEach(el=>{
      el.name = this.insumosService.micros[el.prop]?.name.toUpperCase();
      el.qty = this.compQty(el.percent);
      el.amount = this.insumosService.micros[el.prop]?.qty;
      el.price = this.toFixed(this.insumosService.micros[el.prop]?.price);
      el.price_lb = this.toFixed(el.price/el.amount, 3);
      el.price_ton_usd = this.toFixed(el.qty*el.price_lb);
      el.price_ton_dop = this.toFixed(el.price_ton_usd*dolar);
    });
  }

  private computeTotalNucleo(nucleoType: string, dolar: number){
    const nucleo = this[nucleoType].map(el=> el.price_ton_usd).reduce((p,c)=> p+=c, 0);
    this.total_nucleo[nucleoType]['costo_quintal'].usd = this.toFixed(nucleo);
    this.total_nucleo[nucleoType]['costo_indirectos'].usd = this.insumosService.otros['indirectos'].price;
    this.total_nucleo[nucleoType]['subtotal'].usd  = this.toFixed(this.total_nucleo[nucleoType]['costo_quintal'].usd + this.total_nucleo[nucleoType]['costo_indirectos'].usd);
    this.total_nucleo[nucleoType]['utilidad'].usd = this.toFixed(this.total_nucleo[nucleoType]['subtotal'].usd * (this.insumosService.otros['utilidad'].price/100))
    this.total_nucleo[nucleoType]['costo_fundas'].usd = this.insumosService.otros['fundas'].price;
    this.total_nucleo[nucleoType]['costo_etiquetas'].usd = this.insumosService.otros['etiquetas'].price;
    const total = this.total_nucleo[nucleoType]['subtotal'].usd + this.total_nucleo[nucleoType]['utilidad'].usd + this.total_nucleo[nucleoType]['costo_fundas'].usd + this.total_nucleo[nucleoType]['costo_etiquetas'].usd;
    this.total_nucleo[nucleoType]['costo_final'].usd = this.toFixed(total);

    this.total_nucleo[nucleoType]['costo_quintal'].dop = this.toFixed(nucleo*dolar);
    this.total_nucleo[nucleoType]['costo_indirectos'].dop = this.insumosService.otros['indirectos'].price*dolar;
    this.total_nucleo[nucleoType]['subtotal'].dop  = this.toFixed((this.total_nucleo[nucleoType]['costo_quintal'].usd + this.total_nucleo[nucleoType]['costo_indirectos'].usd)*dolar);
    this.total_nucleo[nucleoType]['utilidad'].dop = this.toFixed((this.total_nucleo[nucleoType]['subtotal'].usd * (this.insumosService.otros['utilidad'].price/100))*dolar)
    this.total_nucleo[nucleoType]['costo_fundas'].dop = this.toFixed(this.insumosService.otros['fundas'].price * dolar);
    this.total_nucleo[nucleoType]['costo_etiquetas'].dop = this.toFixed(this.insumosService.otros['etiquetas'].price*dolar);
    this.total_nucleo[nucleoType]['costo_final'].dop = this.toFixed(total*dolar);
  }

  private computeTotalAlimento(alimentoType: string, dolar: number){
    this.total_alimento[alimentoType]['costo_quintal'].usd = this.toFixed(this[alimentoType].map(el=> el.price_ton_usd).reduce((p,c)=> p+=c, 0));
    this.total_alimento[alimentoType]['costo_prod'].usd = this.toFixed(this.total_alimento[alimentoType]['costo_quintal'].usd/20);
    this.total_alimento[alimentoType]['costo_elab'].usd = this.toFixed(this.insumosService.otros['elaboracion'].price);
    this.total_alimento[alimentoType]['costo_final'].usd = this.toFixed(this.total_alimento[alimentoType]['costo_elab'].usd + this.total_alimento[alimentoType]['costo_prod'].usd)

    this.total_alimento[alimentoType]['costo_quintal'].dop = this.toFixed(this[alimentoType].map(el=> el.price_ton_dop).reduce((p,c)=> p+=c, 0));
    this.total_alimento[alimentoType]['costo_prod'].dop = this.toFixed(this.total_alimento[alimentoType]['costo_quintal'].dop/20);
    this.total_alimento[alimentoType]['costo_elab'].dop = this.toFixed(this.insumosService.otros['elaboracion'].price*dolar);
    this.total_alimento[alimentoType]['costo_final'].dop = this.toFixed(this.total_alimento[alimentoType]['costo_elab'].dop + this.total_alimento[alimentoType]['costo_prod'].dop);
  }

  delay(time=500): Promise<void>{
    return new Promise((p,r)=>{
      setTimeout(p, time);
    });
  }

  private compQty(num: number): number{
      return this.toFixed(num*20);
  }

  private toFixed(num: number, dec=2): number{
    if(!num) return 0;
    const factor = dec <=2? 100 : 1000;
    const x = parseInt(Math.round(num*factor).toFixed(0));
    return parseFloat((x/factor).toFixed(dec));
  }
}

export enum AlimentoTypeId{
  PRE='pre-iniciador',
  INI='iniciador',
  CRE='crecimiento',
  ENG='engorde',
  FIN='finalizador'
}

export enum AlimentoNucleoTypeId{
  nucleo_pre='nucleo pre-iniciador',
  nucleo_ini='nucleo iniciador',
  nucleo_cre='nucleo crecimiento',
  nucleo_eng='nucleo engorde',
  nucleo_fin='nucleo finalizador'
}

export enum AlimentoType{
  PRE='pre',
  INI='ini',
  CRE='cre',
  ENG='eng',
  FIN='fin'
}

export enum AlimentoNucleoType{
  PRE='nucleo_pre',
  INI='nucleo_ini',
  CRE='nucleo_cre',
  ENG='nucleo_eng',
  FIN='nucleo_fin'
}

interface iTotal{
  name: string; 
  dop: number; 
  usd: number;
}
