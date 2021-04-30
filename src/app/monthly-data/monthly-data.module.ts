import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthlyDataPageRoutingModule } from './monthly-data-routing.module';

import { MonthlyDataPage } from './monthly-data.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MonthlyDataPageRoutingModule
  ],
  declarations: [MonthlyDataPage]
})
export class MonthlyDataPageModule {}
