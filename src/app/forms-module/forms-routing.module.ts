import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LotFormComponent } from './lot-form/lot-form.component';
import { BusinessFormComponent } from './business-form/business-form.component';
import { DailyProdFormComponent } from './daily-prod-form/daily-prod-form.component';

const routes: Routes = [
  {
    path: 'lots/new/:lot_type',
    component: LotFormComponent
  },
  {
    path: 'business/:business_type/new',
    component: BusinessFormComponent
  },
  {
    path: 'daily-prod/lot/:lote',
    component: DailyProdFormComponent
  },
  {
    path: 'daily-prod/lot/:lote/week/:semana',
    component: DailyProdFormComponent
  },
  {
    path: 'daily-prod/fecha/:fecha/lot/:lote/week/:semana',
    component: DailyProdFormComponent
  },
  {
    path: 'daily-prod/lot/:lote/week/:semana/day-init/:day-init',
    component: DailyProdFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsRoutingModule {}
