import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
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
  canActivate(
    next,
    state: RouterStateSnapshot): Observable<boolean>{
    return this.authService.user$.pipe(
      take(1),
      map(user => !!user), //map to Boolean
      tap(loggedIn =>{
        if(!loggedIn){
          console.warn('Access Denied');
          this.browserService.showToast('Acceso denegado', 'lock-closed')
          this.router.navigate(['/signin']);
        }
      })
    );
  }
  
}
