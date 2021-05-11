import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LotInterface, LotModel } from 'src/app/models';
import { BrowserService} from '../helpers';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  lot$ = new BehaviorSubject<LotModel>(null);

_STD = [
  8,15,29,53,70,81,86,88,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,89,
  89,89,88,88,88,88,88,88,88,88,87,87,87,86,86,85,85,85,83,82,81,81,80,79,78,76,75,
  74,73,72,72,71,70,69,68,67,8,15,29,53,70,81,86,88,90,90,90,90,90,90,90,90,90,90,
  90,90,90,90,90,90,90,90,89,89,89,88,88,88,88,88,88,88,88,87,87,87,86,86,85,85,85,
  83,82,81,81,80,79,78,76,75,74,73,72,72,71,70,69,68,67,66,65,66,65,66,65,66,65,
  70,69,68,67,66,65,66,65,66,65,66,65,70,69,68,67,66,65,66,65,66,65,66,65,70,69,68
];

_APROV = [
  0,0,0,0,60.0,70.0,80.0,85.0,90.0,93.0,94.0,95.0,96.0,96.0,96.0,96.0,96.0,96.0,96.0,96.0,
  96.0,96.0,96.0,96.0,95.0,95.0,95.0,95.0,95.0,95.0,94.0,94.0,94.0,94.0,93.0,93.0,93.0,93.0,
  93.0,93.0,93.0,93.0,93.0,93.0,93.0,91.0,91.0,90.0,89.0,89.0,89.0,89.0,89.0,89.0,89.0,87.0,
  86.0,85.0,85.0,84.0,84.0,83.0,83.0,81.0,81.0,80.0,80.0,86.0,85.0,85.0,84.0,84.0,83.0,83.0,
  81.0,81.0,80.0,80.0,86.0,85.0,85.0,84.0,84.0,83.0,83.0,81.0,81.0,80.0,80.0
]

_Nac = [
  0,0,0,0,75,77,79,81,83,84,85,86,87,87,88,88,87,87,87,86,86,86,86,85,85,85,84,84,83,83,82,
  82,82,81,81,81,80,80,80,79,79,78,78,77,77,76,76,75,75,74,73,72,71,70,69,68,67,66,65,64,63,62,
  61,60,59,58,57,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32,
  ,33,32,33,32,33,32,33,32,32,33,33,32,33,32,33,32,33,32,33,32,33,32,33,32,33,32,33,32,33,32,
]

  cols$ = new BehaviorSubject([
    {prop: 'business', header: 'Empresa'},
    {prop: 'entry', header: 'Fecha de<br>entrada'},
    { prop: 'recibidas', header: 'Aves<br>Recibidas'},
    { prop: 'total', header: 'Aves<br>Existentes' },
    {prop: 'production', header: 'Producción<br>huevos totales'},
    {prop: 'incubables', header: 'Huevos<br>Incubables'},
    { prop: 'nacimientos', header: 'Nacimientos<br>totales' }, 
    { prop: 'days', header: 'Edad en<br>Días' }, 
    { prop: 'week', header: 'Edad en<br>Semanas'},
    //{ prop: 'status', header: 'Estado' }, 
  ]);

  colsRecria$ = new BehaviorSubject([
    {prop: 'dia', header: 'Fecha'},
    {prop: 'numero_de_aves', header: 'No. de Aves' },
    {prop: 'mortalidad', header: 'Mortalidad'},
    {prop: 'mortalidad_estandar', header: 'Mort. Estandar'},
    {prop: 'estandar_real', header: 'Estandar Real'},
    {prop: 'prod_huevos_totales', header: 'Producción huevos totales' },
    {prop: 'aprovechamiento_de_huevos_estandar', header: 'Estanadar de Aprovechamiento'},
    {prop: 'huevos_incubables', header: 'Huevos Incubables'},
    {prop: 'estandar_de_nacimientos', header: 'Estandar Nacimientos' }, 
    {prop: 'nacimientos_totales', header: 'Nacimientos totales' }, 
    ]);

  constructor(
    private helperService: BrowserService,
    private api: ApiService,
  ) { 
    
  }

  getLots(): Observable<any[]>{
    return this.api.getLots(new Date().getFullYear()-3).pipe(
      shareReplay(1),
      map(Lots => {
        return Lots.filter(values => this.daysBetween(new Date(values.fecha_entrada), new Date()) < 596)
        .map((Lote, i)=>{
          const {
            id, codigo_aduanero, raza,
            fecha_entrada, 
            variable_mortalidad_recria,
            variable_mortalidad_produccion,
            variable_aprovechamiento_huevos,
            variable_produccion_huevos_totales,
            variable_nacimiento,
            cant_gallinas_asignadas,
            proyeccions
          } = Lote;
          
          const { hembras, machos } = Lote?.cantidad;
          const { nombre_comercial, telefono, direccion } = Lote?.empresa;
          
          //has to  add one day
          const date1= this.formatDate(fecha_entrada);
          const date2= new Date(Date.now());
          const data = {
            id: i+1,
            lotId: id,
            variable_nacimiento,
            cant_gallinas_asignadas,
            business: nombre_comercial,
            phone: telefono,
            address: direccion,
            date: date1,
            code: codigo_aduanero,
            mort: variable_mortalidad_recria,
            mortp: variable_mortalidad_produccion,
            std_prod: variable_produccion_huevos_totales,
            std_aprov: variable_aprovechamiento_huevos,
            race: raza,
            entry: date1,
            week: this.weeksBetween(date1, date2),
            days: this.daysBetween(date1,date2),
            endBreeding: this.initProd(date1),
            females: parseInt(hembras),
            males: parseInt(machos),
          };
          return {
            ...data,
            status: data.week>18? 'production' : 'breeding',
            total: proyeccions[data.days]?.numero_de_aves,
            recibidas: data.females,
            proyeccions,
            production: proyeccions[data.days]?.prod_huevos_totales,
            incubables: proyeccions[data.days]?.huevos_incubables,
            nacimientos: proyeccions[data.days]?.nacimientos_totales
          };
        });
      }),
      catchError(error => throwError(this.helperService.handlError(error)))
    )
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
    return new Date(date.getTime()+((1000 * 3600 * 24)*133))
  }

  private weeksBetween(d1, d2) {
    return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
  }

  private daysBetween(d1,d2) {
    const Difference_In_Time = d2.getTime() - d1.getTime();
    return Math.floor(Difference_In_Time / (1000 * 3600 * 24));
  }

}
