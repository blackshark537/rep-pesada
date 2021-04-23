import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth'
import { UserModel } from '../../models'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
//import "@codetrix-studio/capacitor-google-auth";
import { NativeService } from '../helpers';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<UserModel>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private native: NativeService
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
      })
    )
  }

  async signOut(){
    this.native.remStorage('uid');
    this.afAuth.signOut();
    this.router.navigate(['/signin']);
  }

  async googleSignIn(){
    const provider = new firebase.auth.GoogleAuthProvider();
    let credentials = await this.afAuth.signInWithPopup(provider);
    window.document.location.href = '/'
    this.user$ =  of(credentials.user);
    //return this.updateUserData(credentials.user);
  }

  async facebookSignIn(){
    const provider = new firebase.auth.FacebookAuthProvider();
    let credentials = await this.afAuth.signInWithPopup(provider);
    window.document.location.href = '/'
    this.user$ =  of(credentials.user);
  }

  async emailPswdSignin(email: string, password: string){
    let credentials = await this.afAuth.signInWithEmailAndPassword(email, password);
    return credentials.user
  }

  /* private async googleSignInNative() {
    let { } = await GoogleAuth.signIn();
    
  } */

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
