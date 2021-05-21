import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { StrapiAccess, UserModel } from '../../models'
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BrowserService, NativeService } from '../helpers';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<UserModel>;

  constructor(
    private router  : Router,
    private native  : NativeService,
    private http    : HttpClient,
    private bService: BrowserService
  ) { 
    
  }

  async signOut(){
    this.native.clearStorage();
    this.router.navigate(['/signin']);
  }

  emailPswdSignin(email: string, password: string): Observable<StrapiAccess>{
    const credentials = {
      identifier: email,
      password
    };
    return this.http.post<StrapiAccess>(`${environment.baseUrl}/auth/local`, credentials).pipe(
      catchError(error => throwError(this.bService.handlError(error)))
    )
  }

  private async updateUserData({email, uid, displayName, photoURL}: UserModel){
    const data ={
      uid,
      email,
      photoURL,
      displayName
    };
    return null;
  }
}
