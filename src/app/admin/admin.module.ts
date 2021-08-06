import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { SharedModule } from '../shared/shared.module';
import { VarRepAbuelasComponent } from './var-rep-abuelas/var-rep-abuelas.component';
import { VarRepPesadasComponent } from './var-rep-pesadas/var-rep-pesadas.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModuleModule } from '../forms-module/forms-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModuleModule,
    NgxChartsModule,
    SharedModule,
    AdminPageRoutingModule
  ],
  declarations: [AdminPage, VarRepAbuelasComponent, VarRepPesadasComponent]
})
export class AdminPageModule {}
