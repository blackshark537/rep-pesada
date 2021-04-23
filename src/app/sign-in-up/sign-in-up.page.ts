import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.page.html',
  styleUrls: ['./sign-in-up.page.scss'],
})
export class SignInUpPage implements OnInit {

  credentials:FormGroup;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    })
  }

  signIn(){
    const { email, password } = this.credentials.value;
    this.authService.emailPswdSignin(email, password).subscribe();
  }

}
