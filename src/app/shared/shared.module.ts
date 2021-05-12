import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TableComponent } from './table/table.component';
import { CommasPipe } from '../pipes/numWithCommas.pipe';

@NgModule({
  declarations: [TableComponent, CommasPipe],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule
  ],
  exports: [TableComponent]
})
export class SharedModule { }
