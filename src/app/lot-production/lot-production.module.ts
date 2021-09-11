import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LotProductionPageRoutingModule } from './lot-production-routing.module';

import { LotProductionPage } from './lot-production.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LotProductionPageRoutingModule
  ],
  declarations: [LotProductionPage]
})
export class LotProductionPageModule {}
