import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BirthsByWeeksPage } from './births-by-weeks.page';

const routes: Routes = [
  {
    path: '',
    component: BirthsByWeeksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BirthsByWeeksPageRoutingModule {}
