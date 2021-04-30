import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService, BrowserService, ToastSatusClass } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private browserService: BrowserService
  ){}
  canActivate(
    next,
    state: RouterStateSnapshot): Observable<boolean>{
    return new BehaviorSubject(localStorage.getItem('token')).pipe(
      take(1),
      map(user => !!user), //map to Boolean
      tap(loggedIn =>{
        if(!loggedIn ){
          console.warn('Acceso denegado %s');
          this.browserService.showToast('Acceso denegado', 'lock-closed', ToastSatusClass.error)
          this.router.navigate(['/signin']);
        }
      })
    );
  }
  
}
