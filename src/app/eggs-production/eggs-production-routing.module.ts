import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EggsProductionPage } from './eggs-production.page';

const routes: Routes = [
  {
    path: '',
    component: EggsProductionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EggsProductionPageRoutingModule {}
