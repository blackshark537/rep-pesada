import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BirthChiksEntryPageRoutingModule } from './birth-chiks-entry-routing.module';

import { BirthChiksEntryPage } from './birth-chiks-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BirthChiksEntryPageRoutingModule
  ],
  declarations: [BirthChiksEntryPage]
})
export class BirthChiksEntryPageModule {}
