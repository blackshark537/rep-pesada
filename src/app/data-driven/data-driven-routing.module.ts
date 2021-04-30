import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataDrivenPage } from './data-driven.page';

const routes: Routes = [
  {
    path: '',
    component: DataDrivenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataDrivenPageRoutingModule {}
