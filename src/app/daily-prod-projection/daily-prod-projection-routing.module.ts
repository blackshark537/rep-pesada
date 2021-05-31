import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyProdProjectionPage } from './daily-prod-projection.page';

const routes: Routes = [
  {
    path: '',
    component: DailyProdProjectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyProdProjectionPageRoutingModule {}
