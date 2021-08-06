import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LotFormComponent } from './lot-form/lot-form.component';
import { BusinessFormComponent } from './business-form/business-form.component';

const routes: Routes = [
  {
    path: 'lots/new/:lot_type',
    component: LotFormComponent
  },
  {
    path: 'business/:business_type/new',
    component: BusinessFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsRoutingModule {}
