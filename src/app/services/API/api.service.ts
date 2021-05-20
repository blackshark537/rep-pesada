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
  LotForm
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
        return this.http.get<LotResponse[]>(`${environment.baseUrl}/lotes?_where[0][year_gte]=${year}`, this.http_options)
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

  postLot(lot: LotForm): Observable<LotResponse>{
    return this.http.post<LotResponse>(`${environment.baseUrl}/lotes`, lot)
    .pipe(catchError(error => throwError(this.browserService.handlError(error))))
  }

  updateLot(id: number, lot: LotForm): Observable<LotResponse>{
    return this.http.put<LotResponse>(`${environment.baseUrl}/lotes/${id}`, lot)
    .pipe(catchError(error => throwError(this.browserService.handlError(error))))
  }

}
