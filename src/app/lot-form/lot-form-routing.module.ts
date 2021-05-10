import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LotFormPage } from './lot-form.page';

const routes: Routes = [
  {
    path: '',
    component: LotFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LotFormPageRoutingModule {}
