import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LotPage } from './lot.page';

const routes: Routes = [
  {
    path: '',
    component: LotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LotPageRoutingModule {}
