import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Input('name') name;
  @Input('expand') expand='';
  @Input('rows') rows=[];
  @Input('cols') columns = [];
  @Output('selected') selected = new EventEmitter();

  public temp = [];
  public tableStyle = 'material';
  public customPopoverOptions: any = {
    header: 'Themes',
    subHeader: 'Select your theme color',
  };

  constructor() { }

  ngOnInit() {
    this.temp = [...this.rows];
  }

  openRow(row) {
    this.selected.emit({
      action: SelectedActions.open,
      row
    });
  }

  deleteRow(row){
    this.selected.emit({
      action: SelectedActions.delete,
      row
    });
  }

  newRow(){
    this.selected.emit({
      action: SelectedActions.new,
      row: {}
    }); 
  }

  updateFilter(event) {
    const val: string = event.target.value.toLowerCase();
    const temp = this.temp.filter(
      x => (x[this.columns[0].prop.toLowerCase()] as String).toLowerCase().includes(val.toLowerCase()) ||
      (x[this.columns[1].prop.toLowerCase()] as String).toLowerCase().includes(val.toLowerCase()) ||
      (x[this.columns[2].prop.toLowerCase()] as String).includes(val.toLowerCase())
    );
    this.rows = temp;
    this.table.offset = 0;
  }
}

export enum SelectedActions{
  open = "open",
  delete = "delete",
  new = 'new'
}