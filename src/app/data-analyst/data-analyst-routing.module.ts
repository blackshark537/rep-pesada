import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataAnalystPage } from './data-analyst.page';

const routes: Routes = [
  {
    path: '',
    component: DataAnalystPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataAnalystPageRoutingModule {}
