import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapacityPageRoutingModule } from './capacity-routing.module';

import { CapacityPage } from './capacity.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CapacityPageRoutingModule
  ],
  declarations: [CapacityPage]
})
export class CapacityPageModule {}
