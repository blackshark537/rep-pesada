import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  canActivate(): Observable<boolean>{
    return this.authService.user$.pipe(
      take(1),
      map(user => !!user), //map to Boolean
      tap(loggedIn =>{
        if(!loggedIn){
          this.browserService.showToast(
            'Acceso denegado, por favor inicie sesion.', 
            'lock-closed', ToastSatusClass.error
          );
          this.router.navigate(['/signin']);
        }
      })
    );
  }
  
}
