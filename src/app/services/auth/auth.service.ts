import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth'
import { StrapiAccess, UserModel } from '../../models'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of, throwError} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import { BrowserService, NativeService } from '../helpers';
import { environment } from 'src/environments/environment';



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
          native.setStorage('uid',  user.uid);
          return of({
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName,
            phone: user.phoneNumber
          })//afs.doc<UserModel>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      }),
      catchError(error => tap(e =>{
        console.log(error);
      }))
    )
  }

  async signOut(){
    this.native.clearStorage();
    this.afAuth.signOut();
    this.router.navigate(['/signin']);
  }

  async googleSignIn(){
    const provider = new firebase.auth.GoogleAuthProvider();
    let credentials = await this.afAuth.signInWithPopup(provider);
    this.user$ =  of(credentials.user);
    this.emailPswdSignin(credentials.user.email, credentials.user.uid).subscribe();
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
    this.bService.loadingCtrl.create();
    return this.http.post<StrapiAccess>(`${environment.baseUrl}/auth/local`, credentials).pipe(
      map(val => {
        this.bService.loadingCtrl.dismiss();
        this.native.setStorage('token', val.jwt);
        this.router.navigate(['/user']);
        return val
      }),
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
