import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EggsProductionPageRoutingModule } from './eggs-production-routing.module';

import { EggsProductionPage } from './eggs-production.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    EggsProductionPageRoutingModule
  ],
  declarations: [EggsProductionPage]
})
export class EggsProductionPageModule {}
