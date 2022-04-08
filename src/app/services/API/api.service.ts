import { HttpClient, HttpEventType, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { 
  ProducerInterface,
  CapacityInterface,
  BusinessInterface,
  InventoryInterface,
  LotInterface,
  LotProjection,
  LotResponse,
  LotForm,
  ProductionInterface,
  DailyProdMetaInterface,
  iFormVariables
} from 'src/app/models';
import { environment } from 'src/environments/environment';
import { BrowserService } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http_options:any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    reportProgress:true,
    observe: "events",
  };
  constructor(
    private http: HttpClient,
    private browserService: BrowserService
  ) { }

  getProducers()  : Observable<ProducerInterface[]>{ 
    return this.http.get<any[]>(`${environment.baseUrl}/perfil-usuarios`)
    .pipe(catchError(error => throwError(this.browserService.handlError(error))))
  }
  
  getCapacities() : Observable<CapacityInterface[]>{ 
    return this.http.get<any[]>(`${environment.baseUrl}/capacidad-instaladas`)
    .pipe(catchError(error => throwError(this.browserService.handlError(error))))
  }
  
  getInventories(): Observable<InventoryInterface[]>{ 
    return this.http.get<any[]>(`${environment.baseUrl}/inventarios`)
    .pipe(catchError(error => throwError(this.browserService.handlError(error))))
  }

  getBusinesses() : Observable<BusinessInterface[]>{ 
    return from(this.browserService.loadingCtrl.create({ message: 'Cargando Empresas...' })).pipe(
      switchMap(load =>{
        load.present();
        return this.http.get<BusinessInterface[]>(`${environment.baseUrl}/empresas/only`)
        .pipe(
          tap(a =>{
            load.dismiss();
            return a;
          }),
          catchError(error => {
            load.dismiss();
            return throwError(this.browserService.handlError(error))
          })
        )
      })
    )
  }

  getLots(year?: number): Observable<LotResponse[]> {
    let progress = 0;
    let body=[];
    return from(this.browserService.loadingCtrl.create({ message: 'Cargando Lotes, <br> por favor espere...<span id="progress"></span>' })).pipe(
      switchMap(load => {
        load.present();
        return this.http.get<LotResponse[]>(`${environment.baseUrl}/lotes?_where[0][year_gte]=${year}&_where[0][lote_type]=abuelos`, this.http_options)
        .pipe(
            map(event=> {
              if(event.type === HttpEventType.DownloadProgress){
                progress = event.loaded/event.total*100;
                document.querySelector('#progress').innerHTML = `${progress.toPrecision(3)}%`;
              }
              if(event.type === HttpEventType.Response){
                load.dismiss();
                body = [...event.body]
              }
              return body
            }),
            catchError(error => {
              load.dismiss();
              return throwError(this.browserService.handlError(error))
            })
          )
      })
    )
  }

  getLotsByYear(year: number) : Observable<LotInterface[]>{
    return from(this.browserService.loadingCtrl.create({ message: `Cargando Lotes, año ${year}` })).pipe(
      switchMap(load => {
        load.present();
        return  this.http.get<LotInterface[]>(`${environment.baseUrl}/lotes/only?_year=${year}`)
        .pipe(
          tap(async a => {
            await load.dismiss();
            return a
          }),
          catchError(error => {
            load.dismiss();
            return throwError(this.browserService.handlError(error))
          })
        )
      })
    )
  }

  getLots_Pesada(year: number): Observable<LotResponse[]>{
    return from(this.browserService.loadingCtrl.create()).pipe(
      switchMap(load =>{
        load.present();
        return this.http.get<LotResponse[]>(`${environment.baseUrl}/lotes?_year=${year}&_where[0][lote_type]=pesada`)
        .pipe(
          tap(a => {
            load.dismiss();
            return a
          }),
          catchError(error => {
            load.dismiss();
            return throwError(this.browserService.handlError(error))
          })
        )
      })
    )
  }

  getProyectionsByMonth(conf:{month: number, year: number}) : Observable<LotProjection[]>{
    return from(this.browserService.loadingCtrl.create({ message: `Cargando proyeccion año ${conf.year} <br> por favor espere...<span id="progress1"></span>`, duration: 30000 })).pipe(
      switchMap(load =>{
        load.present();
        return this.http.get<LotProjection[]>(`${environment.baseUrl}/proyeccions?_where[0][month]=${conf.month}&_where[1][year]=${conf.year}&_limit=5000`)
        .pipe(
          map(a => {
            load.dismiss();
            return a
          }),
          catchError(error => {
            load.dismiss();
            return throwError(this.browserService.handlError(error))
          })
        )//
      })
    )
    
  }

  getProyectionsAllSince(year: number) : Observable<LotProjection[]>{
    return from(this.browserService.loadingCtrl.create({ message: `Cargando proyeccion<br> desde el año ${year} <br> por favor espere...<span id="progress1"></span>`, duration: 30000 })).pipe(
      switchMap(load =>{
        load.present();
        return this.http.get<LotProjection[]>(`${environment.baseUrl}/proyeccions?_where[0][year_gt]=${year}&_limit=5000`)
        .pipe(
          map(a => {
            load.dismiss();
            return a
          }),
          catchError(error => {
            load.dismiss();
            return throwError(this.browserService.handlError(error))
          })
        )//
      })
    ) 
  }

  postBusiness(business: BusinessInterface): Observable<LotResponse>{
    return this.http.post<LotResponse>(`${environment.baseUrl}/Empresas`, business)
    .pipe(catchError(error => throwError(this.browserService.handlError(error))))
  }

  updateBusiness(id: number, business: BusinessInterface): Observable<LotResponse>{
    return this.http.put<LotResponse>(`${environment.baseUrl}/Empresas/${id}`, business)
    .pipe(catchError(error => throwError(this.browserService.handlError(error))))
  }

  postLot(lot: LotForm): Observable<LotResponse>{
    return this.http.post<LotResponse>(`${environment.baseUrl}/lotes`, lot)
    .pipe(catchError(error => throwError(this.browserService.handlError(error))))
  }

  updateLot(id: number, lot: LotForm): Observable<LotResponse>{
    return this.http.put<LotResponse>(`${environment.baseUrl}/lotes/${id}`, lot)
    .pipe(catchError(error => throwError(this.browserService.handlError(error))))
  }

  get_daily_productions(lotId: number, week: number): Observable<ProductionInterface[]>{
    return this.http.get<ProductionInterface[]>(`${environment.baseUrl}/daily-productions?_where[lote]=${lotId}&_where[semana]=${week}`)
    .pipe(catchError(error => throwError(this.browserService.handlError(error))))
  }

  post_daily_production(produccion: ProductionInterface): Observable<ProductionInterface>{
    return this.http.post<ProductionInterface>(`${environment.baseUrl}/daily-productions`, produccion)
    .pipe(catchError(error => throwError(this.browserService.handlError(error))))
  }

  get_daily_prod_meta(lote: number): Observable<DailyProdMetaInterface[]>{
    return from(this.browserService.loadingCtrl.create()).pipe(
      switchMap(load =>{
        load.present();
        return this.http.get<DailyProdMetaInterface[]>(`${environment.baseUrl}/daily-prod-metas?_q=${lote}`)
        .pipe(
          map(a => {
            load.dismiss();
            return a
          }),
          catchError(error => {
            load.dismiss();
            return throwError(this.browserService.handlError(error))
          })
        )
      })
    )
  }

  post_daily_prd_meta(meta: DailyProdMetaInterface): Observable<DailyProdMetaInterface>{
    return from(this.browserService.loadingCtrl.create()).pipe(
      switchMap(load => {
        load.present();
        return this.http.post<DailyProdMetaInterface>(`${environment.baseUrl}/daily-prod-metas`, meta)
        .pipe(
          map(a => {
            load.dismiss();
            return a
          }),
          catchError(error => {
            load.dismiss();
            return throwError(this.browserService.handlError(error))
          })
        )
      })
    )
  }

  delete_daily_prod_meta(id: number): Observable<DailyProdMetaInterface>{
    return from(this.browserService.Confirm('delete')).pipe(
      switchMap(resp =>{
        if(resp){
          return this.http.delete<DailyProdMetaInterface>(`${environment.baseUrl}/daily-prod-metas/${id}`)
        }
        return null;
      })
    )
  }

  get_variables(abuelas_reproductoras: boolean): Observable<iFormVariables>{
    if(abuelas_reproductoras){
      return this.http.get<iFormVariables>(`${environment.baseUrl}/variables`);
    } else {
      return this.http.get<iFormVariables>(`${environment.baseUrl}/variables-reproductoras`);
    }
  }

  update_variables(variables: iFormVariables, abuelas_reproductoras: boolean): Observable<iFormVariables>{
    if(abuelas_reproductoras){
      return this.http.put<iFormVariables>(`${environment.baseUrl}/variables`, variables);
    }else{
      return this.http.put<iFormVariables>(`${environment.baseUrl}/variables-reproductoras`, variables);
    }
  }

  
}
