import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';
import { VarRepAbuelasComponent } from './var-rep-abuelas/var-rep-abuelas.component';
import { VarRepPesadasComponent } from './var-rep-pesadas/var-rep-pesadas.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'rep-abuelas/variables',
    component: VarRepAbuelasComponent
  },
  {
    path: 'rep-pesadas/variables',
    component: VarRepPesadasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
