import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataAnalystPageRoutingModule } from './data-analyst-routing.module';

import { DataAnalystPage } from './data-analyst.page';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxChartsModule,
    IonicModule,
    DataAnalystPageRoutingModule
  ],
  declarations: [DataAnalystPage]
})
export class DataAnalystPageModule {}
