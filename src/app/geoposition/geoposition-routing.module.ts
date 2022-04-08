import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeopositionPage } from './geoposition.page';

const routes: Routes = [
  {
    path: '',
    component: GeopositionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeopositionPageRoutingModule {}
