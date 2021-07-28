import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BirthChiksEntryPageRoutingModule } from './birth-chiks-entry-routing.module';

import { BirthChiksEntryPage } from './birth-chiks-entry.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    BirthChiksEntryPageRoutingModule
  ],
  declarations: [BirthChiksEntryPage]
})
export class BirthChiksEntryPageModule {}
