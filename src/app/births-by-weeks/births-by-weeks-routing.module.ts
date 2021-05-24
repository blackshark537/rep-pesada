import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EggsByWeeksPage } from './births-by-weeks.page';

const routes: Routes = [
  {
    path: '',
    component: EggsByWeeksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EggsByWeeksPageRoutingModule {}
