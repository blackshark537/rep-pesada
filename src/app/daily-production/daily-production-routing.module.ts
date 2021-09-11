import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyProductionPage } from './daily-production.page';

const routes: Routes = [
  {
    path: '',
    component: DailyProductionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyProductionPageRoutingModule {}
