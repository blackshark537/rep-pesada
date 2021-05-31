import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyProdProjectionPageRoutingModule } from './daily-prod-projection-routing.module';

import { DailyProdProjectionPage } from './daily-prod-projection.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    DailyProdProjectionPageRoutingModule
  ],
  declarations: [DailyProdProjectionPage]
})
export class DailyProdProjectionPageModule {}
