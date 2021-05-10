import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LotFormPageRoutingModule } from './lot-form-routing.module';

import { LotFormPage } from './lot-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LotFormPageRoutingModule
  ],
  declarations: [LotFormPage]
})
export class LotFormPageModule {}
