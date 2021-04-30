import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonthlyDataPage } from './monthly-data.page';

const routes: Routes = [
  {
    path: '',
    component: MonthlyDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlyDataPageRoutingModule {}
