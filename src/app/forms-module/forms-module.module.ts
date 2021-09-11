import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsRoutingModule } from './forms-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LotFormComponent } from './lot-form/lot-form.component';
import { BusinessFormComponent } from './business-form/business-form.component';
import { SharedModule } from '../shared/shared.module';
import { DailyProdFormComponent } from './daily-prod-form/daily-prod-form.component';



@NgModule({
  declarations: [
    BusinessFormComponent,
    LotFormComponent,
    DailyProdFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    IonicModule,
    FormsRoutingModule
  ]
})
export class FormsModuleModule { }
