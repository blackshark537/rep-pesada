import { Injectable } from '@angular/core';
import { AlimentoService, AlimentoType, AlimentoTypeId } from './alimento.service';
import { CostsService } from './costs.service';
import { TablaAlimentoService } from './tabla-alimento.service';

@Injectable({
  providedIn: 'root'
})
export class FinalcostsService {

  private cols = [
    { prop: 'desc', header: 'Descripción' },
    { prop: 'qty', header: 'Cantidad' },
    { prop: 'und', header: 'Costo Unitario' },
    { prop: 'total', header: 'Total' },
    { prop: 'percent', header: '%' },
    { prop: 'chick_price', header: 'Costo Pollo' },
    { prop: 'pound_price', header: 'Costo Libra' },
  ];

  private titles = [
    "POLLITOS BB",
    "ALIMENTO PRE-INICIADOR",
    "ALIMENTO INICIADOR",
    "ALIMENTO CRECIMIENTO",
    "ALIMENTO ENGORDE",
    "VACUNAS Y MEDICAMENTOS",
    "CALEFACCION GAS PROPANO",
    "MANO DE OBRA GRANJEROS",
    "ENERGIA ELECTRICA",
    "ENERGIA PROPIA (PLANTA)",
    "CASCARILLA DE ARROZ",
    "TRANSPORTE ALIMENTOS,POLLITOS,CASCARILLA",
    "GASTOS INDIRECTOS Y OTROS",
    "GASTOS GENERALES Y ADMINISTRATIVOS",
    "GASTOS FINANCIEROS",
    "DEPRECIACIONES",
    "MANTENIMIENTO DE MAQUI. Y EQUIPOS",
    "SEGUROS EXTRUTURA,EQUIPOS, INVENTARIOS",
  ];

  private final_title = `VALOR PROYECTADO AL COSTO DE LA INDUSTRIA PARA EL ${new Date().getFullYear()}`;

  private init_state: {
    desc: "", 
    qty: 0, 
    und: 0,
    total: 0,
    percent: 0,
    chick_price: 0,
    pound_price: 0
  };

  private table: iTable = {};
  private resume ={};
  //private params={};

  constructor(
    private alimentoService: AlimentoService,
    private tablaAlimento: TablaAlimentoService,
    private costsService: CostsService
  ) { }

  getCols(): {prop: string; header: string}[]{
    return this.cols;
  }

  async getRows(): Promise<iParams[]>{
    await this.compileTable();
    return Object.values(this.table).map((el, i)=> ({id: i+1, ...el }));
  }

  async compileTable(){
    this.table = {};
    this.titles.forEach((t, i)=>{
      this.table[t] = {desc: t, ...this.init_state};
    });

    this.table["POLLITOS BB"].qty = this.costsService.data_tecnica.aves_totales.value;
    this.table["POLLITOS BB"].und = 30;
    this.table["POLLITOS BB"].total = this.table["POLLITOS BB"].qty * this.table["POLLITOS BB"].und;
    await this.tablaAlimento.compileTable();
    await this.alimentoService.compileResume();
    const alimento = this.tablaAlimento.getDataTable();
    const pre_ini = alimento.map(al=> al.pre).reduce((p,c)=>p+=c, 0);
    const und_pre = this.alimentoService.getResumenTotal(AlimentoType.PRE).find(el=> el.name === 'COSTO TOTAL').dop;
    this.table["ALIMENTO PRE-INICIADOR"].qty = this.toFixed(pre_ini);
    this.table["ALIMENTO PRE-INICIADOR"].und = this.toFixed(und_pre);
    this.table["ALIMENTO PRE-INICIADOR"].total = this.toFixed(this.table["ALIMENTO PRE-INICIADOR"].qty * this.table["ALIMENTO PRE-INICIADOR"].und);

    const ini = alimento.map(al=> al.ini).reduce((p,c)=>p+=c, 0);
    const und_ini = this.alimentoService.getResumenTotal(AlimentoType.INI).find(el=> el.name === 'COSTO TOTAL').dop;
    this.table["ALIMENTO INICIADOR"].qty = this.toFixed(ini);
    this.table["ALIMENTO INICIADOR"].und = this.toFixed(und_ini);
    this.table["ALIMENTO INICIADOR"].total = this.toFixed(this.table["ALIMENTO INICIADOR"].qty * this.table["ALIMENTO INICIADOR"].und);

    const cre = alimento.map(al=> al.cre).reduce((p,c)=>p+=c, 0);
    const und_cre = this.alimentoService.getResumenTotal(AlimentoType.CRE).find(el=> el.name === 'COSTO TOTAL').dop;
    this.table["ALIMENTO CRECIMIENTO"].qty = this.toFixed(cre);
    this.table["ALIMENTO CRECIMIENTO"].und = this.toFixed(und_cre);
    this.table["ALIMENTO CRECIMIENTO"].total = this.toFixed(this.table["ALIMENTO CRECIMIENTO"].qty * this.table["ALIMENTO CRECIMIENTO"].und);

    const eng = alimento.map(al=> al.eng).reduce((p,c)=>p+=c, 0);
    const und_eng = this.alimentoService.getResumenTotal(AlimentoType.ENG).find(el=> el.name === 'COSTO TOTAL').dop;
    this.table["ALIMENTO ENGORDE"].qty = this.toFixed(eng);
    this.table["ALIMENTO ENGORDE"].und = this.toFixed(und_eng);
    this.table["ALIMENTO ENGORDE"].total = this.toFixed(this.table["ALIMENTO ENGORDE"].qty * this.table["ALIMENTO ENGORDE"].und);

    this.table["VACUNAS Y MEDICAMENTOS"].total = 1439724;
    this.table["CALEFACCION GAS PROPANO"].total = 1168280;
    this.table["MANO DE OBRA GRANJEROS"].total = 1523182;
    this.table["ENERGIA ELECTRICA"].total = 951989;
    this.table["ENERGIA PROPIA (PLANTA)"].total = 1459716;
    this.table["CASCARILLA DE ARROZ"].total = 761591;
    this.table["TRANSPORTE ALIMENTOS,POLLITOS,CASCARILLA"].total = 793324;
    this.table["GASTOS INDIRECTOS Y OTROS"].total = 317330;
    this.table["GASTOS GENERALES Y ADMINISTRATIVOS"].total = 571193;
    this.table["GASTOS FINANCIEROS"].total = 1193159;
    this.table["DEPRECIACIONES"].total = 793324;
    this.table["MANTENIMIENTO DE MAQUI. Y EQUIPOS"].total = 634659;
    this.table["SEGUROS EXTRUTURA,EQUIPOS, INVENTARIOS"].total = 380795;
    const total_value = this.toFixed(this.getTotalValue(),0);
    this.compilePercent();
    const total_percent = this.toFixed(this.sumPercent(),0);

    const pollos_en_venta = this.costsService.data_tecnica.aves_terminadas.value;
    const peso_promedio = this.costsService.data_tecnica.peso_promedio.value;
    const lbs_producidas = this.toFixed(pollos_en_venta*peso_promedio);
    const costo_prod_lbs = this.toFixed(total_value/lbs_producidas);
    
    //const sum_costo_lbs = this.toFixed(this.sumCostoLbs());

    this.table[this.final_title] = {...this.init_state};
    this.table[this.final_title].desc = this.final_title;
    this.table[this.final_title].total = total_value;
    this.table[this.final_title].percent = total_percent;
    this.compileCostoLbs(costo_prod_lbs);
    this.compileChickPrice(peso_promedio);
    const chick_price = this.toFixed(this.sumChickPrice());
    this.table[this.final_title].chick_price = chick_price;

    
  }


  private compileCostoLbs(costo_lbs: number){
    Object.values(this.table).forEach(el=> el.pound_price = this.toFixed((el.percent*costo_lbs)/100));
  }

  private compileChickPrice(avg_lbs: number){
    Object.values(this.table).forEach(el=> el.chick_price = this.toFixed(el.pound_price*avg_lbs));
  }

  private sumChickPrice(): number{
    return Object.values(this.table).map(el=> el.desc != this.final_title? el.chick_price : 0 ).reduce((p,c)=> p+=c, 0);
  }

  private compilePercent(){
    const total = this.getTotalValue();
    Object.values(this.table).forEach(el=> el.percent = this.toFixed(el.total/total*100));
  }

  private sumPercent(): number{
    return Object.values(this.table).map(el=> el.percent ).reduce((p,c)=> p+=c, 0);
  }

  private getTotalValue(): number{
    return Object.values(this.table).map(el=> el.total).reduce((p,c)=> p+=c, 0)
  }

  private toFixed(num: number, dec=2): number{
    if(!num) return 0;
    const factor = dec <=2? 100 : 1000;
    const x = parseInt(Math.round(num*factor).toFixed(0));
    return parseFloat((x/factor).toFixed(dec));
  }
}

interface iTable{
  [name: string]: iParams
}

interface iParams{
  desc: string;
  qty:number;
  und:number;
  total:number;
  percent:number;
  chick_price:number;
  pound_price:number;
}