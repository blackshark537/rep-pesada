import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { LotInterface, LotProdInterface } from 'src/app/models';
import { BrowserService} from '../helpers';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  lot$ = new BehaviorSubject<LotProdInterface>(null);

_STD = [
  8,15,29,53,70,81,86,88,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,89,
  89,89,88,88,88,88,88,88,88,88,87,87,87,86,86,85,85,85,83,82,81,81,80,79,78,76,75,
  74,73,72,72,71,70,69,68,67,8,15,29,53,70,81,86,88,90,90,90,90,90,90,90,90,90,90,
  90,90,90,90,90,90,90,90,89,89,89,88,88,88,88,88,88,88,88,87,87,87,86,86,85,85,85,
  83,82,81,81,80,79,78,76,75,74,73,72,72,71,70,69,68,67,66,65,66,65,66,65,66,65 
];

_APROV = [
  0,0,0,0,60.0,70.0,80.0,85.0,90.0,93.0,94.0,95.0,96.0,96.0,96.0,96.0,96.0,96.0,96.0,96.0,
  96.0,96.0,96.0,96.0,95.0,95.0,95.0,95.0,95.0,95.0,94.0,94.0,94.0,94.0,93.0,93.0,93.0,93.0,
  93.0,93.0,93.0,93.0,93.0,93.0,93.0,91.0,91.0,90.0,89.0,89.0,89.0,89.0,89.0,89.0,89.0,87.0,
  86.0,85.0,85.0,84.0,84.0,83.0,83.0,81.0,81.0,80.0,80.0
]

_Nac = [
  0,0,0,0,75,77,79,81,83,84,85,86,87,87,88,88,87,87,87,86,86,86,86,85,85,85,84,84,83,83,82,
  82,82,81,81,81,80,80,80,79,79,78,78,77,77,76,76,75,75,74,73,72,71,70,69,68,67,66,65,64,63,62,
  61,60,59,58,57,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32
]

  cols$ = new BehaviorSubject([
  {prop: 'Business'},
  { prop: 'Females' },
  { prop: 'Days' }, 
  { prop: 'Week'},
  { prop: 'endBreeding' }, 
  ]);

  colsRecria$ = new BehaviorSubject([
    { prop: 'Week'},
    { prop: 'Chicks' },
    { prop: 'Mort'},
    { prop: 'Standar'},
    {prop: 'stdReal'},
    { prop: 'Production' },
    {prop: 'Aprov'},
    {prop: 'AprovReal'},
    { prop: 'Birth' }, 
    { prop: 'BirthTotal' }, 
    ]);

  constructor(
    private helperService: BrowserService,
    private http: HttpClient
  ) { 
    
  }

  private getRecria(lote){
    let recria=[];
    const total_weeks=18;
    for (let i = 0; i < total_weeks; i++) {

      const {business, week, lot, mort, mortp, date, females, std_prod, std_aprov} = lote;
      
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
        std_prod,
        std_aprov,
        entry: date2,
        chicks: Math.round(females - ((100-mortality)*10)),
      });
    }
    return recria;
  }

  private getProd(lote){
    let prod=[];
    const total_weeks=67;
    const conf_weeks = 5;

    for (let i = 0; i < total_weeks; i++) {

      const {business, week, lot, entry, chicks, mortp, std_prod, std_aprov } = lote;
      
      const percent = prod[i-1]?.mort || 100;
      const mortality =  percent  - ( mortp / total_weeks );

      let production_real = ( ( this._STD[i] * std_prod ) - this._STD[i] ) / 100;
      let std_aprovechamiento = ( ( this._APROV[i] * std_aprov ) - this._APROV[i] ) / 100;

      const date1 = new Date(entry.getTime()+( 7 * 24 * 60 * 60 * 1000))//add 9+1 weeks
      const date2 = new Date(date1.getTime()+(( 7 * 24 * 60 * 60 * 1000) * i));

      if(i<=conf_weeks){
        prod.push({
          id:  i,
          business,
          week:lote.week+i+1,//add 8+1 weeks
          weekIndx: week,
          lot,
          mort:  100,
          entry: date2,
          standar: this._STD[i] + '%',
          aprov: this._APROV[i] + '%',
          chicks: chicks,
          stdReal: '-',
          aprovReal: '-',
          production: '-', //total eggs
          birth: '-',
          birthTotal: '-'
        });
      } else {
        prod.push({
          id:  i,
          business,
          week:lote.week+i+1,//add 8+i weeks
          weekIndx: week,
          lot,
          mort:  Math.round(mortality*100)/100 ,
          entry: date2,
          standar: this._STD[i] + '%',
          aprov: this._APROV[i] + '%',
          chicks: Math.round(chicks - ((100-mortality)*10)),
          stdReal: production_real,
          aprovReal: ((Math.round(chicks - ((100-mortality)*10))*production_real)*std_aprovechamiento).toFixed(2),
          production: (Math.round(chicks - ((100-mortality)*10))*production_real).toFixed(2), //total eggs
          birth: this._Nac[i] + '%',
          birthTotal: (((Math.round(chicks - ((100-mortality)*10))*production_real)*std_aprovechamiento)*(this._Nac[i]*0.01)).toFixed(2)
        });
      }
    }
    return prod;
  }

  getLots(): Observable<any[]>{
    return this.http.get<LotInterface[]>(`${environment.baseUrl}/lotes`).pipe(
      map(Lots => {
        return Lots.map(Lote =>{
          const {
            id, lote, codigo_aduanero, raza,
            fecha_entrada, 
            variable_mortalidad_recria,
            variable_mortalidad_produccion,
            variable_aprovechamiento_huevos,
            variable_produccion_huevos_totales
          } = Lote;
          
          const { hembras, machos } = Lote?.cantidad;
          const { ambiente } = Lote?.capacidad_instalada;
          const { nombre_comercial, telefono, direccion } = Lote?.empresa;
          
          //has to  add one day
          const date1= this.formatDate(fecha_entrada);
          const date2= new Date(Date.now());
          const data = {
            id,
            business: nombre_comercial,
            phone: telefono,
            address: direccion,
            lot: lote,
            date: date1,
            code: codigo_aduanero,
            mort: variable_mortalidad_recria,
            mortp: variable_mortalidad_produccion,
            std_prod: variable_produccion_huevos_totales,
            std_aprov: variable_aprovechamiento_huevos,
            race: raza,
            enviroment: ambiente,
            entry: date1.toDateString(),
            week: this.weeksBetween(date1, date2),
            days: this.daysBetween(date1,date2),
            endBreeding: this.initProd(date1),
            females: parseInt(hembras),
            males: parseInt(machos),
            total: parseInt(hembras)+parseInt(machos),
          }

          const recria = this.getRecria(data);
          const produccion = data.week>20? this.getProd(recria[recria.length-1]) : [];
          return {
            ...data,
            recria,
            status: data.week>20? 'production' : 'breeding',
            produccion
          }
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
