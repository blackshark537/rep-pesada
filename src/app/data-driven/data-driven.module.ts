import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataDrivenPageRoutingModule } from './data-driven-routing.module';

import { DataDrivenPage } from './data-driven.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DataDrivenPageRoutingModule
  ],
  declarations: [DataDrivenPage]
})
export class DataDrivenPageModule {}
