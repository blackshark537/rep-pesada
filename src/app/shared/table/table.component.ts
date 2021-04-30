import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { TableActions } from '..';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Input('name') name;
  @Input('expand') expand='';
  @Input('tableActions') tableActions: TableActions = {
    new: false,
    open: false,
    delete: false
  };
  @Input('rows') rows=[];
  @Input('cols') columns = [];
  @Output('selected') selected = new EventEmitter();

  loading=false;
  public temp = [];
  public tableStyle = 'bootstrap';
  public customPopoverOptions: any = {
    header: 'Themes',
    subHeader: 'Select your theme color',
  };

  constructor() { }

  ngOnInit() {
    this.temp = [...this.rows];
  }

  get hasActions(){
    let actions = Object.values(this.tableActions);
    return actions.filter(a => a === true).length > 0;
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

  onSort(event) {
    this.loading = true;
    const rows = [...this.rows];
    const filter = this.columns.filter(x => x.header === event.column.name)[0].prop.toLowerCase();
    if(!!filter === false ) return; //if theres no filter match return
    const sort = event.sorts[0];
    rows.sort((a, b) => {
      if(typeof(a[filter]) === 'number') {
        return a[filter] > b[filter]? 1 * (sort.dir === 'desc' ? -1 : 1) : -1 * (sort.dir === 'desc' ? -1 : 1);
      }

      return a[filter].toString()
      .localeCompare(b[filter].toString()) * 
      (sort.dir === 'desc' ? -1 : 1);
    });

    this.rows = rows;
    this.loading = false;
  }

  updateFilter(event) {
    const val: string = event.target.value.toLowerCase();
    const temp = this.temp.filter(
      x => (x[this.columns[0].prop.toLowerCase()] as String).toLowerCase().includes(val.toLowerCase()) ||
      (x[this.columns[1].prop.toLowerCase()] as String).toLowerCase().includes(val.toLowerCase()) 
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