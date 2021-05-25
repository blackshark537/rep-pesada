import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppModel, EggLotInterface } from '../models';
import { TableActions } from '../shared';

@Component({
  selector: 'app-eggs-production',
  templateUrl: './eggs-production.page.html',
  styleUrls: ['./eggs-production.page.scss'],
})
export class EggsProductionPage implements OnInit {

  lot$:  Observable<EggLotInterface[]>=of([]);
  col$ = new BehaviorSubject([
    { prop: 'estado', header: 'Estado' }, 
    {prop: 'date', header: 'Fecha de<br>Entrada'},
    { prop: 'cant_gallinas_proyectadas', header: 'Aves<br>Recibidas'},
    { prop: 'cant_gallinas_existentes', header: 'Aves<br>Existentes' },
    {prop: 'production', header: 'Huevos<br>Totales'},
    { prop: 'days_passed', header: 'Edad en<br>Días' }, 
    { prop: 'weeks_passed', header: 'Edad en<br>Semanas'},
  ]);
  tableActions: TableActions  = {
    open:   true,
    new:    false,
    delete: false,
    edit: false
  }

  total_production=0;

  constructor(
    private store: Store<AppModel>
  ) { }

  ngOnInit() {
    const date=new Date();
    this.lot$ = this.store.select('eggLots').pipe(
      map(lots=> lots.filter(x => x.weeks_passed > 0 && x.weeks_passed <100  && x.month <= date.getMonth())
      .map(val=>{
        this.total_production += parseInt(val.production.toFixed(1));
        return val;
      }))
    );
  }

  selected(evt){
    console.log(evt);
  }

}
