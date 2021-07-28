import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocviewPageRoutingModule } from './docview-routing.module';

import { DocviewPage } from './docview.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PdfViewerModule,
    DocviewPageRoutingModule
  ],
  declarations: [DocviewPage]
})
export class DocviewPageModule {}
