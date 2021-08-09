import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailLotPage } from './detail-lot.page';

const routes: Routes = [
  {
    path: '',
    component: DetailLotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailLotPageRoutingModule {}
