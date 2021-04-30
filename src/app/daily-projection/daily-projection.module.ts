import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyProjectionPageRoutingModule } from './daily-projection-routing.module';

import { DailyProjectionPage } from './daily-projection.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DailyProjectionPageRoutingModule
  ],
  declarations: [DailyProjectionPage]
})
export class DailyProjectionPageModule {}
