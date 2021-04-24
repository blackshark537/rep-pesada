import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeService } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor{

  constructor(
    private native: NativeService
  ) { }

  intercept(req, next){
    const token = this.native.getFromStorage('token');
    const request = req.clone({
      setHeaders:{
        Authorization: !!token?`Bearer ${token}` : ''
      }
    });
    return next.handle(request);
  }
}
