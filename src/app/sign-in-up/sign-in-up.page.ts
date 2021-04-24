import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, NativeService } from '../services';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.page.html',
  styleUrls: ['./sign-in-up.page.scss'],
})
export class SignInUpPage implements OnInit {

  credentials:FormGroup;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private native: NativeService
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    })
    this.authService.user$.subscribe(resp =>{
        if(!!resp){
          this.credentials.patchValue({
            email: resp.email,
            password: resp.uid
          });
          this.signIn();
        }
    })
  }

  signIn(){
    const { email, password } = this.credentials.value;
    this.authService.emailPswdSignin(email, password).subscribe(response =>{
      this.native.setStorage('token', response.jwt);
    });
  }

}
