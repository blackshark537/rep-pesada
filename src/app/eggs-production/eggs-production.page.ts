import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppModel, EggLotInterface } from '../models';
import { LotService } from '../services';
import { TableActions, TableEvent } from '../shared';

@Component({
  selector: 'app-eggs-production',
  templateUrl: './eggs-production.page.html',
  styleUrls: ['./eggs-production.page.scss'],
})
export class EggsProductionPage implements OnInit {

  lot$:  Observable<EggLotInterface[]>=of([]);
  col$ = new BehaviorSubject([
    //{ prop: 'estado', header: 'Estado' }, 
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
  total_chicks=0;
  estado='';

  constructor(
    private store: Store<AppModel>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private lotService: LotService
  ) { }

  ngOnInit() {
    const date = new Date();
    this.estado = this.activatedRoute.snapshot.paramMap.get('estado');
    this.lot$ = this.store.select('eggLots').pipe(
      map(lots => {
        this.total_production = 0;
        this.total_chicks = 0;
        return lots.filter(x => x.estado === this.estado && x.weeks_passed > 0 && x.weeks_passed < 100 && x.month <= date.getMonth()
        ).map(val => {
          this.total_production += parseInt(val.production.toFixed(1));
          this.total_chicks += val.cant_gallinas_existentes;
          return val;
        })
      })
    );
  }

  selected(evt: TableEvent) {
    //if(evt.action === 'new')    this.router.navigate(['/lot-form'])
    if(evt.action === 'open')   return this.open(evt.row);
    //if(evt.action === 'edit')   return this.edit(evt.row);
    //if(evt.action === 'delete') return this.delete(evt.row);
  }

  open(row){
    this.lotService.lot$.next(row);
    this.router.navigate(['/breeder', true])
  }
}
