import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BreederPage } from './breeder.page';

const routes: Routes = [
  {
    path: '',
    component: BreederPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BreederPageRoutingModule {}
