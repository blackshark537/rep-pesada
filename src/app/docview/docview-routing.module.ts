import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocviewPage } from './docview.page';

const routes: Routes = [
  {
    path: '',
    component: DocviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocviewPageRoutingModule {}
