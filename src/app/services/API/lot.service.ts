import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AppModel, LotInterface, LotModel, LotProjection } from 'src/app/models';
import { BrowserService } from '../helpers';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { ApiService } from './api.service';
import { projectionsActions } from '../../actions'
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  lot$ = new BehaviorSubject<LotModel>(null);

  _PROD = [
    0, 0, 0, 29, 53, 70, 81, 86, 88, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 89,
    89, 89, 88, 88, 88, 88, 88, 88, 88, 88, 87, 87, 87, 86, 86, 85, 85, 85, 83, 82, 81, 81, 80, 79, 78, 76, 75,
    74, 73, 72, 72, 72, 72, 71, 70, 69, 68, 67, 66, 65, 65, 66, 65, 66, 66, 65, 65, 66, 65, 66, 66, 65, 65, 66, 65, 66,
    66, 65, 65, 66, 65, 66, 66, 65, 65, 66, 65, 66, 66, 65, 65, 66, 65, 66, 66, 65, 65, 66, 65, 66, 66, 65, 65, 66, 65, 66,
  ];

  _APROV = [
    0, 0, 0, 0, 0, 60.0, 70.0, 80.0, 85.0, 90.0, 93.0, 94.0, 95.0, 96.0, 96.0, 96.0, 96.0, 96.0, 96.0, 96.0, 96.0,
    96.0, 96.0, 96.0, 96.0, 95.0, 95.0, 95.0, 95.0, 95.0, 95.0, 94.0, 94.0, 94.0, 94.0, 93.0, 93.0, 93.0, 93.0,
    93.0, 93.0, 93.0, 93.0, 93.0, 93.0, 93.0, 91.0, 91.0, 90.0, 89.0, 89.0, 89.0, 89.0, 89.0, 89.0, 89.0, 87.0,
    86.0, 85.0, 85.0, 84.0, 84.0, 83.0, 83.0, 81.0, 81.0, 80.0, 80.0, 86.0, 85.0, 85.0, 84.0, 84.0, 83.0, 83.0,
    81.0, 81.0, 80.0, 80.0, 86.0, 85.0, 85.0, 84.0, 84.0, 83.0, 83.0, 81.0, 81.0, 80.0, 80.0
  ];

  _Nac = [
    0, 0, 0, 0, 0, 75, 77, 79, 81, 83, 84, 85, 86, 87, 87, 88, 88, 87, 87, 87, 86, 86, 86, 86, 85, 85, 85, 84, 84, 83, 83, 82,
    82, 82, 81, 81, 81, 80, 80, 80, 79, 79, 78, 78, 77, 77, 76, 76, 75, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62,
    61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32,
    , 33, 32, 33, 32, 33, 32, 33, 32, 32, 33, 33, 32, 33, 32, 33, 32, 33, 32, 33, 32, 33, 32, 33, 32, 33, 32, 33, 32, 33, 32,
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
    { prop: 'mortalidad', header: 'Mortalidad<br>Aproximada' },
    //{prop: 'mortalidad_estandar', header: 'Estandar de<br>Mortalidad'},
    { prop: 'estandar_real', header: 'Estandar de<br>Producción' },
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
    { prop: 'mortalidad', header: 'Mortalidad<br>Aproximada' },
    //{prop: 'mortalidad_estandar', header: 'Estandar de<br>Mortalidad'},
    { prop: 'estandar_real', header: 'Estandar de<br>Producción' },
    { prop: 'prod_huevos_totales', header: 'Huevos<br>Producidos' },
  ]);

  constructor(
    private helperService: BrowserService,
    private api: ApiService,
    private store: Store<AppModel>
  ) {

  }

  getLots(): Observable<LotModel[]> {
    console.log('Estandar nacimientos:  ', this._Nac.length);
    return this.api.getLots(new Date().getFullYear() - 5).pipe(
      shareReplay(1),
      map(Lots => {
        return Lots.map((Lote, i) => {
          const {
            id, codigo_aduanero, raza,
            fecha_entrada,
            variable_mortalidad_recria,
            variable_mortalidad_produccion,
            variable_aprovechamiento_huevos,
            variable_produccion_huevos_totales,
            variable_nacimiento,
            cant_gallinas_asignadas,
          } = Lote;

          const { hembras, machos } = Lote?.cantidad;
          const { nombre_comercial, telefono, direccion } = Lote?.empresa;

          //has to  add one day
          const date1 = this.formatDate(fecha_entrada);
          const date2 = new Date(Date.now());
          const data = {
            id: i + 1,
            lotId: id,
            variable_nacimiento,
            cant_gallinas_asignadas,
            business: nombre_comercial,
            phone: telefono,
            address: direccion,
            date: date1,
            code: codigo_aduanero,
            variable_mortalidad_recria,
            variable_mortalidad_produccion,
            variable_produccion_huevos_totales,
            variable_aprovechamiento_huevos,
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
            status: data.days > 126 ? 'production' : 'breeding',
            total: parseInt(projections[data.days]?.numero_de_aves),
            recibidas: data.females,
            //projections,
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
    let dt = [];
    lot.recria.forEach(recria => {
      let projection = {
        id: entity.id,
        age: recria.weekAge,
        dia: recria.entry,
        estado: 'recria',
        empresa: recria.business,
        aprovechamiento_de_huevos_estandar: recria.aprov,
        mortalidad: recria.mort,
        mortalidad_estandar: recria.standar,
        estandar_real: recria.stdreal,
        estandar_de_nacimientos: recria.birth,
        year: recria.entry.getFullYear(),
        month: recria.entry.getMonth() + 1,
        day: recria.entry.getDate(),
        huevos_incubables: recria.hincub,
        prod_huevos_totales: recria.prodhtotal,
        nacimientos_totales: recria.birthtotal,
        numero_de_aves: recria.chicks,
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
        mortalidad_estandar: production.standar,
        estandar_real: production.stdreal,
        estandar_de_nacimientos: production.birth,
        year: production.entry.getFullYear(),
        month: production.entry.getMonth() + 1,
        day: production.entry.getDate(),
        huevos_incubables: production.hincub,
        prod_huevos_totales: production.prodhtotal,
        nacimientos_totales: production.birthtotal,
        numero_de_aves: production.chicks,
        lote: entity.id
      }
      dt.push(projection)
    });
    return dt;
  }

  private getRecria(lote: LotModel) {
    let recria = [];
    let index = 0;
    const total_weeks = 18;
    for (let i = 0; i < total_weeks * 7; i++) {

      if (i % 7 === 0) index += 1;

      const {
        business, week,
        variable_mortalidad_recria,
        variable_mortalidad_produccion, date, females,
        variable_produccion_huevos_totales,
        variable_aprovechamiento_huevos, variable_nacimiento } = lote;

      const percent = recria[i - 1]?.mort || 100;
      const mortality = percent - (6/* variable_mortalidad_recria */ / (total_weeks * 7));
      //const date2 = new Date(date.getTime()+(( 1 * 24 * 60 * 60 * 1000) * i));
      const date1 = new Date(date.getTime() + (1 * 24 * 60 * 60 * 1000))
      const date2 = new Date(date.getTime() + ((i * 24 * 60 * 60 * 1000)));

      recria.push({
        id: i,
        business,
        day: this.daysBetween(date1, date2) + i,//day:i+1,
        weekIndx: week,
        weekAge: index,
        mort: Math.round(mortality * 100) / 100,
        standar: 0,
        aprov: 0,
        stdreal: 0,
        hincub: 0,
        prodhtotal: 0, //total eggs
        birth: 0,
        birthtotal: 0,
        variable_produccion_huevos_totales,
        variable_aprovechamiento_huevos,
        variable_nacimiento,
        variable_mortalidad_produccion,
        entry: date2,
        chicks: Math.round(females - ((100 - mortality) * 10)),
      });

    }
    return recria;
  }

  private getProd(lote) {
    let prod = [];
    let index = 0;
    const total_weeks = 67;
    const conf_weeks = 2;
    for (let i = 0; i < total_weeks * 7; i++) {

      if (i % 7 === 0) index += 1;

      const { business, day, entry, chicks,
        variable_mortalidad_produccion,
        variable_produccion_huevos_totales,
        variable_aprovechamiento_huevos,
        variable_nacimiento } = lote;

      const percent = prod[i - 1]?.mort || 100;
      const mortality = percent - (13/* variable_mortalidad_produccion */ / (total_weeks * 7));

      const production_real = (this._PROD[index] > 0 ? this._PROD[index] - 2/* variable_produccion_huevos_totales */ : this._PROD[index]) / 100;
      const std_aprovechamiento = (this._APROV[index] > 0 ? this._APROV[index] - 2/* variable_aprovechamiento_huevos */ : this._APROV[index]) / 100;
      const std_nacimientos = this._Nac[index] > 0 ? this._Nac[index] - 2/* variable_nacimiento */ : this._Nac[index];
      const date2 = new Date(entry.getTime() + ((1 * 24 * 60 * 60 * 1000) * (i + 1)));

      if (i <= (conf_weeks * 7)) {
        prod.push({
          id: i,
          business,
          weekAge: index + 18,
          day: lote.day + i + 1,//add 1 day
          dayIndx: day,
          mort: Math.round(mortality * 100) / 100,
          entry: date2,
          standar: Math.round(production_real * 100),
          aprov: Math.round(std_aprovechamiento * 100),
          chicks: Math.round(chicks - ((100 - mortality) * 10)),
          stdreal: 0,
          hincub: 0,
          prodhtotal: 0, //total eggs
          birth: 0,
          birthtotal: 0
        });
      } else {
        prod.push({
          id: i,
          business,
          weekAge: index + 18,
          day: lote.day + i + 1,//add 1 day
          dayIndx: day,
          mort: Math.round(mortality * 100) / 100,
          entry: date2,
          standar: Math.round(production_real * 100),
          aprov: Math.round(std_aprovechamiento * 100),
          chicks: Math.round(chicks - ((100 - mortality) * 10)),
          stdreal: production_real,
          hincub: ((Math.round(chicks - ((100 - mortality) * 10)) * production_real) * std_aprovechamiento).toFixed(0),
          prodhtotal: (Math.round(chicks - ((100 - mortality) * 10)) * production_real).toFixed(0), //total eggs
          birth: Math.round(std_nacimientos),
          birthtotal: ((((Math.round(chicks - ((100 - mortality) * 10)) * production_real) * std_aprovechamiento) * (std_nacimientos * 0.01)) / 2).toFixed(0)
        });
      }

    }
    return prod;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                  DATE FUNCTIONS
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //add one day
  formatDate(date) {
    return new Date(new Date(date).getTime() + (24 * 60 * 60 * 1000))
  }

  //when the production start
  private initProd(date) {
    return new Date(date.getTime() + ((1000 * 3600 * 24) * 133))
  }

  //weeks count since the entry date
  weeksBetween(d1: Date, d2: Date) {
    return Math.round((d2.getTime() - d1.getTime()) / (7 * 24 * 60 * 60 * 1000))+1;
  }

  //days count since the entry date
  daysBetween(d1, d2) {
    const Difference_In_Time = d2.getTime() - d1.getTime();
    return Math.floor(Difference_In_Time / (1000 * 3600 * 24)) + 1;
  }
}
