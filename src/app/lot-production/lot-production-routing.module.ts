import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LotProductionPage } from './lot-production.page';

const routes: Routes = [
  {
    path: '',
    component: LotProductionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LotProductionPageRoutingModule {}
