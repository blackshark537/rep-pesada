import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyPopulationPageRoutingModule } from './daily-population-routing.module';

import { DailyPopulationPage } from './daily-population.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyPopulationPageRoutingModule
  ],
  declarations: [DailyPopulationPage]
})
export class DailyPopulationPageModule {}
