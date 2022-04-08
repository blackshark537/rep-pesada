import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeopositionPageRoutingModule } from './geoposition-routing.module';

import { GeopositionPage } from './geoposition.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GeopositionPageRoutingModule
  ],
  declarations: [GeopositionPage]
})
export class GeopositionPageModule {}
