import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth'
import { StrapiAccess, UserModel } from '../../models'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import { BrowserService, NativeService } from '../helpers';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<UserModel>;

  constructor(
    private afAuth  : AngularFireAuth,
    private afs     : AngularFirestore,
    private router  : Router,
    private native  : NativeService,
    private http    : HttpClient,
    private bService: BrowserService
  ) { 
    this.user$ = afAuth.authState.pipe(
      switchMap(user => {
        if(user){
          return of({
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName,
            phone: user.phoneNumber
          })//afs.doc<UserModel>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    ).pipe(
      map(user => {
        return user;
      })
    )
  }

  async signOut(){
    this.afAuth.signOut();
    this.native.remStorage('token');
    this.router.navigate(['/signin']);
  }

  async googleSignIn(){
    await this.bService.loadingCtrl.create();
    const provider = new firebase.auth.GoogleAuthProvider();
    let credentials = await this.afAuth.signInWithPopup(provider);
    this.user$ = of(credentials.user);
  }

  async facebookSignIn(){
    const provider = new firebase.auth.FacebookAuthProvider();
    let credentials = await this.afAuth.signInWithPopup(provider);
    this.user$ =  of(credentials.user);
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
    const userRef: AngularFirestoreDocument<UserModel> = this.afs.doc(`users/${uid}`);

    const data ={
      uid,
      email,
      photoURL,
      displayName
    };

    return userRef.set(data, {merge: true});

  }
}
