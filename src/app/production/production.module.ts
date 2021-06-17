import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProductionPageRoutingModule } from './production-routing.module';

import { ProductionPage } from './production.page';
import { BusinessPieGraphComponent } from './business-pie-graph/business-pie-graph.component';
import { LightbreederBarGraphComponent } from './lightbreeder-bar-graph/lightbreeder-bar-graph.component';
import { BarMonthlyLightbreederComponent } from './bar-monthly-lightbreeder/bar-monthly-lightbreeder.component';
import { MonthBarEggsIndustryComponent } from './month-bar-eggs-industry/month-bar-eggs-industry.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxChartsModule,
    ProductionPageRoutingModule
  ],
  declarations: [
    ProductionPage, 
    BusinessPieGraphComponent,
    LightbreederBarGraphComponent,
    BarMonthlyLightbreederComponent,
    MonthBarEggsIndustryComponent
  ]
})
export class ProductionPageModule {}
