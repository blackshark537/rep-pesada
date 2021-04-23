import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInUpPage } from './sign-in-up.page';

const routes: Routes = [
  {
    path: '',
    component: SignInUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignInUpPageRoutingModule {}
