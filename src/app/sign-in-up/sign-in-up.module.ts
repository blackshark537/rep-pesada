import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignInUpPageRoutingModule } from './sign-in-up-routing.module';

import { SignInUpPage } from './sign-in-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInUpPageRoutingModule
  ],
  declarations: [SignInUpPage]
})
export class SignInUpPageModule {}
