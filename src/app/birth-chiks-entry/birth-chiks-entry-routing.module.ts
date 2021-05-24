import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BirthChiksEntryPage } from './birth-chiks-entry.page';

const routes: Routes = [
  {
    path: '',
    component: BirthChiksEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BirthChiksEntryPageRoutingModule {}
