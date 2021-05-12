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
  @Input('isLimited') isLimited = true;
  @Input('expand') expand='';
  @Input('tableActions') tableActions: TableActions = {
    new: false,
    open: false,
    delete: false,
    edit: false,
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

  get limit(){
    return this.isLimited? 19 : 1000;
  }

  openRow(row) {
    this.selected.emit({
      action: SelectedActions.open,
      row
    });
  }

  editRow(row){
    this.selected.emit({
      action: SelectedActions.edit,
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

  getType(value){
    return typeof(value) === 'number';
  }

  onSort(event) {
    this.loading = true;
    const rows = [...this.rows];
    const filter = this.columns.filter(x => x.header === event.column.name)[0].prop.toLowerCase();
    if(!!filter === false ) return; //if theres no filter match return
    const sort = event.sorts[0];

    rows.sort((a, b) => {
      if(typeof(a[filter]) === 'object') {
        let c = a[filter] as Date;
        let d = b[filter] as Date;
        return c.getTime() > d.getTime()? 1 * (sort.dir === 'desc' ? -1 : 1) : -1 * (sort.dir === 'desc' ? -1 : 1);
      }

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

    const temp = this.temp.map(val => {
      if(typeof(val[this.columns[0].prop]) != 'number') return val;
    }).filter(x => {
      if(!!x === false) return []
      return x[this.columns[0].prop].toLowerCase().includes(val)
    });
    this.rows = temp;
    this.table.offset = 0;
  }
}

export enum SelectedActions{
  open = "open",
  edit = "edit",
  delete = "delete",
  new = 'new'
}