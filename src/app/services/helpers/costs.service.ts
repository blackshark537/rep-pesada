import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DatatableService, TypeFilter } from './datatable.service';

@Injectable({
  providedIn: 'root'
})
export class CostsService {

  readonly sub$: Subscription[] = [];
  readonly dateNow = new Date();
  readonly months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  pollos_recibidos= null;
  mortalidad = 10.00;
  private readonly tonelada= 22.046;
  private readonly precio_dolar = 55.58;

  data_tecnica = {
    
    aves_totales: { title: `CANTIDAD DE POLLITOS A RECIBIR EN GRANJA`, value: 0, readonly: true, type: 'text',},
    mortalidad: { title: `PORCIENTO DE MORTALIDAD `, value: this.mortalidad, readonly: false, type: 'number', },
    aves_terminadas: { title: `CANTIDAD DE POLLOS TERMINADOS EN GRANJA`, value: this.afterMortality, readonly: false, type: 'number', },
    alimento: { title: `VARIABLE DE CONSUMO ALIMENTO PARA AJUSTE CONVERSION`, value: 16.50, readonly: false, type: 'number', },
    peso_promedio: { title: `PESO PROMEDIO DEL POLLO A 42 DIAS`, value: 4.60, readonly: false, type: 'number', },
    precio_sto_dom:{ title: `PRECIO DEL POLLO EN GRANJA EN SANTO DOMINGO`, value: 45.00,readonly: false, type: 'number', },
    total_cibao:{ title: `PRECIO DEL POLLO EN GRANJA EN EL CIBAO`, value: 45.00, readonly: false, type: 'number', },
    precio_real_sto_dom: { title: `PRECIO PROMEDIO REAL SANTO DOMINGO/CIBAO`, value: 45.00, readonly: false, type: 'number', },
    precio_dollar: { title: `DÓLAR VALOR ACTUAL`, value: this.precio_dolar, readonly: false, type: 'number', },
    precio_bushel_maiz: { title: `PRECIO DEL BUSHEL MAIZ MERCADO BURSATIL (39.37 LBS)`, value: 7.91, readonly: false, type: 'number', },
    precio_transporte: { title: `PRECIO DE BASE Y TRANSPORTE USD$`, value: 110.00, readonly: false, type: 'number', },
    precio_bushel_soya: { title: `PRECIO DEL BUSHEL DE LA SOYA EN EL MERCADO BURSATIL`, value: 460.50, readonly: false, type: 'number', },
    precio_base_transporte: { title: `PRECIO DE BASE Y TRANSPORTE USD$`, value: 125.00, readonly: false, type: 'number',}

  };

  data_precio_maiz = {
    precio_dolar: {...this.data_tecnica.precio_dollar},
    precio_bushel_maiz: {...this.data_tecnica.precio_bushel_maiz},
    bushel_lbs: { title: 'UNIDAD DE MEDIDA BUSHEL LBS', value: 39.37, readonly: false, type: 'number'},
    precio_muelle: { 
      title: 'PRECIO EN MUELLE POR  TONELADA USA', 
      value: this.toFixed(this.data_tecnica.precio_bushel_maiz.value * 39.37), 
      readonly: false, type: 'number'
    },
    precio_base_transporte:{...this.getParametros().find(el=> el.title.includes('PRECIO DE BASE Y TRANSPORTE USD$'))},
    precio_tonelada_muelle: { title: 'PRECIO TONELADA EN MUELLE RD $US', value: 0,readonly: false, type: 'number'},
    precio_quintal: { title: 'COSTO POR QQ  MUELLE REP. DOM. $RD', value: 0, readonly: false, type: 'number'},
    precio_aduanas: { title: 'GASTOS ADUANALES POR QQ RD$', value: 6.0, readonly: false, type: 'number'},
    transporte_muelle: { title: 'TRANSPORTE DEL MUELLE A PLANTA POR QQ RD$', value: 32, readonly: false, type: 'number'},
    precio_planta_alimento:{ title: 'PRECIO POR TM EN PLANTA DE ALIMENTO  $RD SIN MERMA', value: 0, readonly: false, type: 'number'},
    precio_quintal_planta: { title: 'PRECIO POR QQ EN PLANTA  DE ALIMENTO US$ SIN MERMA', value: 0, readonly: false, type: 'number'},
    precio_merma_maiz: { title: 'MERMA DEL MAIZ EN PLANTA DE ALIMENTO', value: 0.5, readonly: false, type: 'number'},
    coste_final_maiz: { title: 'COSTO FINAL  POR QQ DE MAIZ EN PLANTA DE ALIMENTO $US', value: 0, readonly: false, type: 'number'},
    coste_quintal_maiz: { title: 'COSTO  POR QQ DE MAIZ EN PLANTA DE ALIMENTO RD', value: 0, readonly: false, type: 'number'},
    coste_tonelada_maiz: { title: 'COSTO TON. MAIZ EN PLANTA DE ALIMENTO $US', value: 0, readonly: false, type: 'number'},
    conste_tonelada_maiz_planta: { title: 'COSTO TON. MAIZ EN PLANTA DE ALIMENTO $RD', value: 0, readonly: false, type: 'number'},
  }

  data_precio_soya = {
    precio_dolar: {...this.data_tecnica.precio_dollar},
    precio_bushel_soya: {...this.data_tecnica.precio_bushel_soya},
    variable_calculo: { title: 'VARIABLE DE CALCULO ', value: 1.1, readonly: true, type: 'number' },
    precion_muelle: { title: 'PRECIO EN MUELLE POR  TONELADA USA', value: 0, readonly: true, type: 'number'},
    precio_base_transporte: { ...this.data_tecnica.precio_base_transporte },
    precio_tonelada_muelle: { title: 'PRECIO TONELADA EN MUELLE REP.DOM. US$', value: 0, readonly: true, type: 'number' },
    precio_quintal_muelle: { title: 'COSTO POR QQ  MUELLE REP. DOM.RD$', value: 0, readonly: true, type: 'number' },
    precio_aduanas: { title: 'GASTOS ADUANALES POR QQ RD$', value: 10, readonly: false, type: 'number' },
    transporte_muelle_planta: { title: 'TRANSPORTE DEL MUELLE A PLANTA POR QQ RD$', value: 32, readonly: false, type: 'number' },
    precio_quintal_no_merma_rd: { title: 'PRECIO POR QQ EN PLANTA DE ALIMENTO  $RD SIN MERMA', value: 0, readonly: true, type: 'number' },
    precio_quintal_no_merma_usd: { title: 'PRECIO POR QQ EN PLANTA  DE ALIMENTO $US SIN MERMA', value: 0, readonly: true, type: 'number' },
    merma: { title: 'MERMA DE LA SOYA EN PLANTA DE ALIMENTO', value: 0.75, readonly: false, type: 'number' },
    precio_quintal_planta_usd: { title: 'COSTO  POR QQ DE SOYA EN PLANTA DE ALIMENTO EN US$', value: 0, readonly: true, type: 'number' },
    precio_quintal_planta_rd: { title: 'COSTO  POR QQ DE SOYA EN PLANTA DE ALIMENTO EN RD$', value: 0, readonly: true, type: 'number' },
    precio_ton_soya_usd: { title: 'COSTO TON. SOYA EN PLANTA DE ALIMENTO EN US$', value: 0, readonly: true, type: 'number' },
    precio_ton_soya_rd: { title: 'COSTO TON. SOYA EN PLANTA DE ALIMENTO EN RD$', value: 0, readonly: true, type: 'number' }
  }
  private month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dec'];

  constructor(
    private loadCtrl: LoadingController,
    private datatable: DatatableService,
    //private http: HttpClient
  ) {
    //this.getDollar();
    this.getPollitosNacidos();
  }

  getDollar(){
    /* const sub1 = this.http.get(
      "/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json"
    ).subscribe(resp=>{
        console.log(resp);
    });
    this.sub$.push(sub1); */
    return this.precio_dolar;
  }

  getPollitosNacidos(){
    const sub2 = this.datatable.getReproductorasData(this.dateNow.getFullYear(), 'produccion', TypeFilter.Nacimientos, false).subscribe(resp=>{
      this.pollos_recibidos = resp.datatable[this.dateNow.getDate()-1][this.month[this.dateNow.getMonth()]];
      this.data_tecnica.aves_totales.value = this.pollos_recibidos;
      this.mortalidad = 10//this.effectService.variable_mortalidad_pollitos_ajustado;
      this.data_tecnica.mortalidad.value = this.mortalidad;
      this.data_tecnica.aves_terminadas.value = Math.floor(this.afterMortality);
    });
    this.sub$.push(sub2);
  }

  private get afterMortality(){
    return this.pollos_recibidos - (this.pollos_recibidos * (this.mortalidad *100)/100)/100;
  }

  private addPercentage(value: number, percent: number): number{
    return (value + percent /100);
  }

  private calcPreciosMaiz(){
    this.data_precio_maiz.precio_tonelada_muelle.value = this.toFixed(this.data_precio_maiz.precio_muelle.value + this.data_precio_maiz.precio_base_transporte.value);
    this.data_precio_maiz.precio_quintal.value = this.toFixed((this.data_precio_maiz.precio_tonelada_muelle.value/this.tonelada) * this.precio_dolar);
    this.data_precio_maiz.precio_planta_alimento.value = this.toFixed(this.data_precio_maiz.precio_quintal.value + this.data_precio_maiz.precio_aduanas.value + this.data_precio_maiz.transporte_muelle.value);
    this.data_precio_maiz.precio_quintal_planta.value = this.toFixed(this.data_precio_maiz.precio_planta_alimento.value / this.precio_dolar);
    this.data_precio_maiz.coste_final_maiz.value = this.toFixed(this.addPercentage(this.data_precio_maiz.precio_quintal_planta.value, 18));
    this.data_precio_maiz.coste_quintal_maiz.value = this.toFixed(this.data_precio_maiz.coste_final_maiz.value * this.precio_dolar);
    this.data_precio_maiz.coste_tonelada_maiz.value = this.toFixed(this.data_precio_maiz.coste_final_maiz.value * this.tonelada);
    this.data_precio_maiz.conste_tonelada_maiz_planta.value = this.toFixed(this.data_precio_maiz.coste_quintal_maiz.value * this.tonelada);
  }

  private calcPreciosSoya(){
    this.data_precio_soya.precion_muelle.value = this.toFixed(this.data_precio_soya.precio_bushel_soya.value * this.data_precio_soya.variable_calculo.value);
    this.data_precio_soya.precio_tonelada_muelle.value = this.toFixed(this.data_precio_soya.precion_muelle.value + this.data_precio_soya.precio_base_transporte.value);
    this.data_precio_soya.precio_quintal_muelle.value = this.toFixed((this.data_precio_soya.precio_tonelada_muelle.value/this.tonelada)*this.precio_dolar);
    const { precio_aduanas, transporte_muelle_planta} = this.data_precio_soya;
    this.data_precio_soya.precio_quintal_no_merma_rd.value = this.toFixed(this.data_precio_soya.precio_quintal_muelle.value + precio_aduanas.value + transporte_muelle_planta.value);
    this.data_precio_soya.precio_quintal_no_merma_usd.value = this.toFixed(this.data_precio_soya.precio_quintal_no_merma_rd.value / this.precio_dolar);
    this.data_precio_soya.precio_quintal_planta_usd.value = this.addPercentage(this.data_precio_soya.precio_quintal_no_merma_usd.value, 18);
    this.data_precio_soya.precio_quintal_planta_rd.value = this.toFixed(this.data_precio_soya.precio_quintal_planta_usd.value * this.precio_dolar);
    this.data_precio_soya.precio_ton_soya_usd.value = this.toFixed(this.data_precio_soya.precio_quintal_planta_usd.value * this.tonelada);
    this.data_precio_soya.precio_ton_soya_rd.value = this.toFixed(this.data_precio_soya.precio_quintal_planta_rd.value * this.tonelada);
  }

  private toFixed(num: number, dec=2): number{
    if(!num) return 0;
    const factor = dec <=2? 100 : 1000;
    const x = parseInt(Math.round(num*factor).toFixed(0));
    return parseFloat((x/factor).toFixed(dec));
  }

  private delay(time=500): Promise<void>{
      return new Promise((p,r)=>{
        setTimeout(p, time);
      });
  }

  async getMaizTable(): Promise<iPrices[]>{
    const load = await this.loadCtrl.create();
    load.present();
    this.calcPreciosMaiz();
    await this.delay();
    load.dismiss();
    return Object.values(this.data_precio_maiz);
  }

  async getSoyaTable(): Promise<iPrices[]>{
    const load = await this.loadCtrl.create();
    load.present();
    this.calcPreciosSoya();
    await this.delay();
    load.dismiss();
    return Object.values(this.data_precio_soya);
  }

  getParametros(): iPrices[]{
    return Object.values(this.data_tecnica);
  }

  get Month(): string{
    return this.months[this.dateNow.getMonth()];
  }

  unsubscribe(): void{
    this.sub$.forEach(sub=>{
      sub.unsubscribe();
    });
  }
}

interface iPrices{
  title: string;
  value: number;
  readonly: boolean;
  type: string;
}
