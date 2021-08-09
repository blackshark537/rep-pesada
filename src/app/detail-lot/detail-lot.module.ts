import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailLotPageRoutingModule } from './detail-lot-routing.module';

import { DetailLotPage } from './detail-lot.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    DetailLotPageRoutingModule
  ],
  declarations: [DetailLotPage]
})
export class DetailLotPageModule {}
