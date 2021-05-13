import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyPopulationPage } from './daily-population.page';

const routes: Routes = [
  {
    path: '',
    component: DailyPopulationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyPopulationPageRoutingModule {}
