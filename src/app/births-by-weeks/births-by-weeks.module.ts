import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BirthsByWeeksPageRoutingModule } from './births-by-weeks-routing.module';

import { BirthsByWeeksPage } from './births-by-weeks.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    BirthsByWeeksPageRoutingModule
  ],
  declarations: [BirthsByWeeksPage]
})
export class BirthsByWeeksPageModule {}
