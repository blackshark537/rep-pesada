import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EggsByWeeksPageRoutingModule } from './eggs-by-weeks-routing.module';

import { EggsByWeeksPage } from './eggs-by-weeks.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    EggsByWeeksPageRoutingModule
  ],
  declarations: [EggsByWeeksPage]
})
export class EggsByWeeksPageModule {}
