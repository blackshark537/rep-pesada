import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AppModel, LotInterface, LotModel, LotProjection } from 'src/app/models';
import { BrowserService } from '../helpers';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { ApiService } from './api.service';
import { projectionsActions } from '../../actions'
import { Store } from '@ngrx/store';
import { differenceInDays, differenceInWeeks, addDays } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  variable_mortalidad_recria =  0;
  variable_mortalidad_recria_ajustado =  0;

  variable_mortalidad_produccion = 0;
  variable_mortalidad_produccion_ajustado = 0;

  variable_produccion_huevos_totales =  0;
  variable_aprovechamiento_huevos = 0;
  variable_nacimientos = 0;
  semanas_en_recria = 24;
  semanas_en_produccion = 41;
  semanas_de_retardo = 0;

  lot$ = new BehaviorSubject<LotModel>(null);

  _PROD = [
    0,8.40,28.50,48,60.30,69.70,74.10,77.50,77.40,77.10,76.30,74.80,73.10,71.40,69.30,67.20,65.10,63.30,
    61.10,59,57.10,55.30,53.50,51.60,49.70,48,46.20,44.80,43.60,42.40,41.40,40.50,39.50,38.60,37.70,36.80,
    36,35.10,34.20,33.30,32,31,30,29,28,27,26,25,24,23,22
  ];

  _APROV = [
    0,50,78,84,88,90,92,94,94,95,95,95,95,95,95,96,96,96,96,96,96,96,96,96,96,96,96,95,95,95,95,95,95,
    94,94,94,94,94,93,93,93,93,93,93,92,92,92,92,91,91,90];

  _Nac = [
    0,0,55,65,70,75,80,81,82,83,83,82,82,82,81,81,81,80,80,80,80,79,79,78,78,77,77,77,76,76,75,75,74,74,
    73,73,72,70,69,68,67,66,65,64,63,62,61,60,59,58,57
  ];


  cols$ = new BehaviorSubject([
    { prop: 'business', header: 'Empresa y/o<br>Productor' },
    { prop: 'entry', header: 'Fecha de<br>Entrada' },
    { prop: 'recibidas', header: 'Aves<br>Recibidas' },
    { prop: 'total', header: 'Aves<br>Existentes' },
    { prop: 'production', header: 'Huevos<br>Producidos' },
    { prop: 'incubables', header: 'Huevos<br>Incubables' },
    { prop: 'nacimientos', header: 'Nacimientos<br>Totales' },
    { prop: 'days', header: 'Edad en<br>Días' },
    { prop: 'week', header: 'Edad en<br>Semanas' },
    //{ prop: 'status', header: 'Estado' }, 
  ]);

  colsBreading$ = new BehaviorSubject([
    { prop: 'business', header: 'Empresa y/o<br>Productor' },
    { prop: 'entry', header: 'Fecha de<br>Entrada' },
    { prop: 'recibidas', header: 'Aves<br>Recibidas' },
    { prop: 'total', header: 'Aves<br>Existentes' },
    { prop: 'days', header: 'Edad en<br>Días' },
    { prop: 'week', header: 'Edad en<br>Semanas' },
    //{ prop: 'status', header: 'Estado' }, 
  ]);

  colsRecria$ = new BehaviorSubject([
    { prop: 'dia', header: 'Fecha' },
    { prop: 'age', header: 'Edad en<br>Semanas' },
    { prop: 'numero_de_aves', header: 'Aves<br>Existentes' },
    { prop: 'mortalidad_real', header: 'Mortalidad' },
    //{prop: 'mortalidad_estandar', header: 'Estandar de<br>Mortalidad'},
    { prop: 'std_produccion', header: 'Estandar de<br>Producción' },
    { prop: 'prod_huevos_totales', header: 'Huevos<br>Producidos' },
    { prop: 'aprovechamiento_de_huevos_estandar', header: 'Estandar de<br>Aprovechamiento' },
    { prop: 'huevos_incubables', header: 'Huevos<br>Incubables' },
    { prop: 'estandar_de_nacimientos', header: 'Estandar de<br>Nacimientos' },
    { prop: 'nacimientos_totales', header: 'Nacimientos<br>Totales /2' },
  ]);
  colsProduction$ = new BehaviorSubject([
    { prop: 'age', header: 'Edad en<br>Semanas' },
    { prop: 'dia', header: 'Fecha' },
    { prop: 'numero_de_aves', header: 'Aves<br>Existentes' },
    { prop: 'mortalidad_real', header: 'Mortalidad' },
    //{prop: 'mortalidad_estandar', header: 'Estandar de<br>Mortalidad'},
    { prop: 'std_produccion', header: 'Estandar de<br>Producción' },
    { prop: 'prod_huevos_totales', header: 'Huevos<br>Producidos' },
    { prop: 'aprovechamiento_de_huevos_estandar', header: 'Estandar de<br>Aprovechamiento' },
    { prop: 'huevos_incubables', header: 'Huevos<br>Incubables' },
    { prop: 'estandar_de_nacimientos', header: 'Estandar de<br>Nacimientos' },
    { prop: 'nacimientos_totales', header: 'Nacimientos<br>Totales' },
    { prop: 'nacimientos_terminados', header: 'Pollos<br>Terminados' },
  ]);

  constructor(
    private helperService: BrowserService,
    private api: ApiService,
    private store: Store<AppModel>
  ) {
    
    this.api.get_variables(true).subscribe(resp=>{

      this.semanas_en_produccion = resp.edad_semanas - this.semanas_en_recria;

      delete resp.mortalidad_recria_details.id;
      const mortalidad_acc = Object.values(resp.mortalidad_recria_details).reduce((pv,nx)=> pv+=nx, 0);
      this.variable_mortalidad_recria = resp.mortalidad_recria;
      this.variable_mortalidad_recria_ajustado = resp.mortalidad_recria + mortalidad_acc;

      delete resp.mortalidad_produccion_details.id;
      const mortalidad_prod_acc = Object.values(resp.mortalidad_produccion_details).reduce((pv,nx)=> pv+=nx, 0);
      this.variable_mortalidad_produccion = resp.mortalidad_produccion;
      this.variable_mortalidad_produccion_ajustado = resp.mortalidad_produccion + mortalidad_prod_acc;

      delete resp.produccion_huevos_totales_details.id;
      const prod_huevos_acc = Object.values(resp.produccion_huevos_totales_details).reduce((pv,nx)=> pv+=nx, 0);
      this.variable_produccion_huevos_totales = resp.produccion_huevos_totales + prod_huevos_acc;

      delete resp.aprovechamiento_huevos_details.id;
      const aprovechamiento_acc = Object.values(resp.aprovechamiento_huevos_details).reduce((pv,nx)=> pv+=nx, 0);
      this.variable_aprovechamiento_huevos = resp.aprovechamiento_huevos + aprovechamiento_acc;

      delete resp.nacimientos_details.id;
      const nacimientos_acc = Object.values(resp.nacimientos_details).reduce((pv,nx)=> pv+=nx, 0);
      this.variable_nacimientos = resp.nacimientos + nacimientos_acc;
      
    });
  }

  getLots(): Observable<LotModel[]> {
    return this.api.getLots(new Date().getFullYear() - 5).pipe(
      shareReplay(1),
      map(Lots => {
        return Lots.map((Lote, i) => {
          const {
            id, codigo_aduanero, raza,
            fecha_entrada,
            cant_gallinas_asignadas,
          } = Lote;

          const { hembras, machos } = Lote?.cantidad;
          const { nombre_comercial, telefono, direccion, RNC } = Lote?.empresa;

          //has to  add one day
          const date1 = this.formatDate(fecha_entrada);
          const date2 = new Date(Date.now());
          const data = {
            id: id,
            lotId: id,
            cant_gallinas_asignadas,
            business: nombre_comercial,
            RNC,
            phone: telefono,
            address: direccion,
            date: date1,
            year: date1.getFullYear(),
            code: codigo_aduanero,
            variable_mortalidad_recria: this.variable_mortalidad_recria,
            variable_mortalidad_produccion: this.variable_mortalidad_produccion_ajustado,
            variable_produccion_huevos_totales: this.variable_produccion_huevos_totales,
            variable_aprovechamiento_huevos: this.variable_aprovechamiento_huevos,
            variable_nacimiento: this.variable_nacimientos,
            race: raza,
            entry: date1,
            week: this.weeksBetween(date1, date2),
            days: this.daysBetween(date1, date2),
            endBreeding: this.initProd(date1),
            females: parseInt(hembras),
            males: parseInt(machos),
          } as LotModel;

          const recria = this.getRecria(data);
          const produccion = this.getProd(recria[recria.length - 1]);

          const lot = {
            ...data,
            recria,
            produccion,
          };

          const projections = this.genProjection(lot, Lote);
          this.store.dispatch(projectionsActions.SET_PROJECTIONS({ projections: [...projections] }))

          return {
            ...data,
            status: data.days > 168 ? 'production' : 'breeding',
            total: parseInt(projections[data.days]?.numero_de_aves),
            recibidas: data.females,
            production: parseInt(projections[data.days]?.prod_huevos_totales),
            incubables: parseInt(projections[data.days]?.huevos_incubables),
            nacimientos: parseInt(projections[data.days]?.nacimientos_totales)
          } as LotModel

        });
      }),
      catchError(error => throwError(this.helperService.handlError(error)))
    )
  }

  async deleteLot(lot: LotInterface) {
    const resp = await this.helperService.Confirm('Confirm to delete this', 'Delete');
    if (resp) {
      console.log('delete', lot.id);
    }
  }

  private genProjection(lot, entity): LotProjection[] {
    let dt: LotProjection[] = [];
    lot.recria.forEach(recria => {
      let projection = {
        id: entity.id,
        age: recria.weekAge,
        dia: recria.entry,
        estado: 'recria',
        empresa: recria.business,
        aprovechamiento_de_huevos_estandar: recria.aprov,
        mortalidad: recria.mort,
        mortalidad_real: recria.mort_real,
        mortalidad_estandar: recria.standar,
        std_produccion: recria.standar,
        estandar_de_nacimientos: recria.birth,
        year: recria.entry.getFullYear(),
        month: recria.entry.getMonth() + 1,
        day: recria.entry.getDate(),
        huevos_incubables: recria.hincub,
        huevos_incubables_real: recria.hincub_real,
        prod_huevos_totales: recria.prodhtotal,
        prod_huevos_totales_real: recria.prodhTotal_real,
        nacimientos_totales: recria.birthtotal,
        nacimientos_totales_real: recria.birthtotal_real,
        numero_de_aves: recria.chicks,
        numero_de_aves_real: recria.chicks_real,
        lote: entity.id
      }
      dt.push(projection)
    });
    lot.produccion.forEach(production => {
      let projection = {
        id: entity.id,
        dia: production.entry,
        age: production.weekAge,
        estado: 'produccion',
        empresa: production.business,
        aprovechamiento_de_huevos_estandar: production.aprov,
        mortalidad: production.mort,
        mortalidad_real: production.mort_real,
        mortalidad_estandar: production.standar,
        std_produccion: production.standar,
        estandar_de_nacimientos: production.birth,
        year: production.entry.getFullYear(),
        month: production.entry.getMonth() + 1,
        day: production.entry.getDate(),
        huevos_incubables: isNaN(production.hincub)? 0 : production.hincub,
        huevos_incubables_real: isNaN(production.hincub_real)? 0 : production.hincub_real,
        prod_huevos_totales: isNaN(production.prodhtotal)? 0 : production.prodhtotal,
        prod_huevos_totales_real: isNaN(production.prodhTotal_real)? 0 : production.prodhTotal_real,
        nacimientos_totales: isNaN(production.birthtotal)? 0 : production.birthtotal,
        nacimientos_totales_real: isNaN(production.birthtotal_real)? 0 : production.birthtotal_real,
        numero_de_aves: isNaN(production.chicks)? 0 : production.chicks,
        numero_de_aves_real: isNaN(production.chicks_real)? 0 : production.chicks_real,
        lote: entity.id
      }
      dt.push(projection)
    });
    return dt as LotProjection[];
  }

  private getRecria(lote: LotModel) {
    let recria = [];
    let index = 0;
    const { business, week, date, females } = lote;
    for (let i = 0; i < this.semanas_en_recria * 7; i++) {

      if (i % 7 === 0) index += 1;

      const percent = recria[i - 1]?.mort || 100;
      const percent_real = recria[i - 1]?.mort_real || 100;
      const mortality = percent - (this.variable_mortalidad_recria /(this.semanas_en_recria * 7))// / (this.semanas_en_recria * 7));
      const mortality_real = percent_real - (this.variable_mortalidad_recria_ajustado /(this.semanas_en_recria*7))
      
      const date1 = new Date(date.getTime() + (1 * 24 * 60 * 60 * 1000))
      const date2 = new Date(date.getTime() + ((i * 24 * 60 * 60 * 1000)));

      recria.push({
        id: i,
        business,
        day: this.daysBetween(date1, date2) + i,//day:i+1,
        weekIndx: week,
        weekAge: index,
        mort: this.toFixed(mortality),
        mort_real: this.toFixed(mortality_real),
        standar: 0,
        aprov: 0,
        stdreal: 0,
        hincub: 0,
        hincub_real: 0,
        prodhtotal: 0, //total eggs
        prodhTotal_real: 0,
        birth: 0,
        birthtotal: 0,
        birthtotal_real: 0,
        entry: date2,
        chicks: Math.round(females - (females * (100 - mortality_real) / 100)),
        chicks_real: Math.round(females - (females * (100 - mortality) /100)),
      });

    }
    return recria;
  }

  private getProd(lote) {
    let prod = [];
    let index = 0;
    const { business, day, entry, chicks } = lote;
    let test=true;
    for (let i = 0; i <= this.semanas_en_produccion * 7; i++) {

      if (i % 7 === 0) index += 1;

      const percent = prod[i - 1]?.mort || 100;
      const percent_real = prod[i - 1]?.mort_real || 100;

      const mortality = percent - (this.variable_mortalidad_produccion/(this.semanas_en_produccion * 7));
      const mortality_real = percent_real - (this.variable_mortalidad_produccion_ajustado/(this.semanas_en_produccion * 7));

      const std_produccion = this._PROD[index] - (this._PROD[index] * this.variable_produccion_huevos_totales/100);
      const std_aprovechamiento = this._APROV[index] - (this._APROV[index] * this.variable_aprovechamiento_huevos/100);
      const std_nacimientos = this._Nac[index] - (this._Nac[index] * this.variable_nacimientos/100);

      const date2 = new Date(entry.getTime() + ((1 * 24 * 60 * 60 * 1000) * (i + 1)));

      const total_chicks = Math.round(chicks - (chicks * (100 - mortality_real)  / 100));
      const total_chicks_real = Math.round(chicks - (chicks * (100 - mortality) / 100));

      /* if(test){
        console.log({std_produccion, std_aprovechamiento, std_nacimientos});
        test=false;
      } */
      const produccion = total_chicks * (std_produccion*0.01);
      const produccion_real = (total_chicks_real * this._PROD[index]) * 0.01;
      
      const aprovechamiento = produccion * (std_aprovechamiento*0.01);
      const aprovechamiento_real = produccion_real * (this._APROV[index]*0.01);

      const nacimientos = aprovechamiento * (std_nacimientos*0.01);
      const nacimientos_real = aprovechamiento_real * (this._Nac[index]*0.01);

      if (i < (this.semanas_de_retardo * 7)) {
        prod.push({
          id: i,
          business,
          weekAge: index + 24,
          day: lote.day + i + 1,//add 1 day
          dayIndx: day,
          entry: date2,
          mort: this.toFixed(mortality),
          mort_real: this.toFixed(mortality_real),
          standar: std_produccion.toFixed(2),
          aprov_real: this._APROV[index],
          aprov: std_aprovechamiento.toFixed(2),
          birth_real: this._Nac[index],
          birth: std_nacimientos.toFixed(2),
          chicks: total_chicks,
          chicks_real: total_chicks_real,
          prodhtotal: Math.floor(produccion),
          prodhTotal_real: Math.floor(produccion_real),
          hincub: Math.floor(aprovechamiento),
          hincub_real: Math.floor(aprovechamiento_real),
          birthtotal: Math.floor(nacimientos/2),
          birthtotal_real: Math.floor(nacimientos_real/2)
        });
      } else {
        prod.push({
          id: i,
          business,
          weekAge: index + 24,
          day: lote.day + i + 1,//add 1 day
          dayIndx: day,
          entry: date2,
          mort: this.toFixed(mortality),
          mort_real: this.toFixed(mortality_real),
          standar_real: this._PROD[index],
          standar: std_produccion.toFixed(2),
          aprov_real: this._APROV[index],
          aprov: std_aprovechamiento.toFixed(2),
          birth_real: this._Nac[index],
          birth: std_nacimientos.toFixed(2),
          chicks: total_chicks,
          chicks_real: total_chicks_real,
          prodhtotal: Math.floor(produccion),
          prodhTotal_real: Math.floor(produccion_real),
          hincub: Math.floor(aprovechamiento),
          hincub_real: Math.floor(aprovechamiento_real),
          birthtotal: Math.floor(nacimientos/2),
          birthtotal_real: Math.floor(nacimientos_real/2)
        });
      }

    }
    return prod;
  }

  private toFixed(num: number, dec=2): number{
    if(!num) return 0;
    const factor = dec <=2? 100 : 1000;
    const x = parseInt(Math.round(num*factor).toFixed(0));
    return parseFloat((x/factor).toFixed(dec));
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                  DATE FUNCTIONS
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //add one day
  formatDate(date) {
    return addDays(new Date(date), 1);
  }

  //when the production start
  private initProd(date: Date) {
    return addDays(date, 133);
  }

  //weeks count since the entry date
  weeksBetween(d1: Date, d2: Date) {
    return differenceInWeeks(d2, d1);
  }

  //days count since the entry date
  daysBetween(d1, d2) {
    return differenceInDays(d2,d1);
  }

}

