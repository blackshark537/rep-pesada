import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LotPageRoutingModule } from './lot-routing.module';

import { LotPage } from './lot.page';
import { SharedModule } from '../shared/shared.module';
import { LotFormPage } from '../lot-form/lot-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    LotPageRoutingModule
  ],
  declarations: [LotPage]
})
export class LotPageModule {}
