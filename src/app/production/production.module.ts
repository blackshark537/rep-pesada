import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProductionPageRoutingModule } from './production-routing.module';

import { ProductionPage } from './production.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxChartsModule,
    ProductionPageRoutingModule
  ],
  declarations: [ProductionPage]
})
export class ProductionPageModule {}
