import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { 
  ProducerInterface,
  CapacityInterface,
  BusinessInterface,
  InventoryInterface
} from 'src/app/models';
import { environment } from 'src/environments/environment';
import { BrowserService } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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
    return this.http.get<any[]>(`${environment.baseUrl}/empresas`)
    .pipe(catchError(error => throwError(this.browserService.handlError(error))))
  }
}