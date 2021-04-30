import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyProjectionPage } from './daily-projection.page';

const routes: Routes = [
  {
    path: '',
    component: DailyProjectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyProjectionPageRoutingModule {}
