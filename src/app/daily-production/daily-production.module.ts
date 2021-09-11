import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyProductionPageRoutingModule } from './daily-production-routing.module';

import { DailyProductionPage } from './daily-production.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    DailyProductionPageRoutingModule
  ],
  declarations: [DailyProductionPage]
})
export class DailyProductionPageModule {}
