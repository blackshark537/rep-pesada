import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TableComponent } from './table/table.component';
import { CommasPipe } from './pipes/numWithCommas.pipe';
import { BackButtonComponent } from './back-button/back-button.component';

@NgModule({
  declarations: [TableComponent, CommasPipe, BackButtonComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule
  ],
  exports: [TableComponent, CommasPipe, BackButtonComponent]
})
export class SharedModule { }
