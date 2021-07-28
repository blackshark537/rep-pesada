import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, NativeService } from '../services';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.page.html',
  styleUrls: ['./sign-in-up.page.scss'],
})
export class SignInUpPage implements OnInit, OnDestroy {

  credentials:FormGroup;
  sub$: Subscription;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private native: NativeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  ngOnDestroy(){

  }

  signIn(){
    const { email, password } = this.credentials.value;
    this.sub$ = this.authService.emailPswdSignin(email, password).subscribe(response =>{
      if(!!response?.jwt){
        this.native.setStorage('token', response.jwt);
        location.href = '/';
      }
    });
  }

}
