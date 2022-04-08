import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, interval, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LotsEffects } from '../effects';
//import { LotsEffects } from '../effects';
import { AppModel, EggLotInterface } from '../models';
import { LotService } from '../services';
import { TableActions, TableEvent } from '../shared';

@Component({
  selector: 'app-eggs-production',
  templateUrl: './eggs-production.page.html',
  styleUrls: ['./eggs-production.page.scss'],
})
export class EggsProductionPage implements OnInit, OnDestroy {

  sub$: Subscription;
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
  total_incubables=0;
  total_nacimientos=0;
  total_pollos_terminados=0;
  total_chicks=0;
  estado='';
  total_weeks=60;
  time = new Date();

  constructor(
    private store: Store<AppModel>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private lotService: LotService,
    lotEffectSerice: LotsEffects
  ) { 
    const { semanas_en_recria, semanas_en_produccion } = lotEffectSerice;
    this.total_weeks = semanas_en_produccion;
  }

  ngOnInit() {
    
    this.sub$ = interval(1000).subscribe(_=>  this.time = new Date());

    this.estado = this.activatedRoute.snapshot.paramMap.get('estado');
    this.lot$ = this.store.select('eggLots').pipe(
      map(lots => {
        this.total_production = 0;
        this.total_incubables= 0;
        this.total_nacimientos=0;
        this.total_pollos_terminados=0;
        this.total_chicks = 0;

        if(this.estado.match('recria')){
          return lots.filter(x => x.estado === this.estado && x.weeks_passed  >= 0  && x.weeks_passed  < this.total_weeks).map(val => {
              this.total_chicks += val.cant_gallinas_existentes;
            return val;
          })
        } else {
          return lots.filter(x => x.estado === this.estado && x.weeks_passed  >= 24  && x.weeks_passed  < this.total_weeks).map(val => {
            
              this.total_chicks += val.cant_gallinas_existentes;
              this.total_production += val.production;
              this.total_incubables += parseInt(val.numero_huevos_incubables);
              this.total_nacimientos += parseInt(val.numero_nacimientos);
              this.total_pollos_terminados += val.nacimientos_terminados;
            return val;
          })
        }
      })
    );
  }

  ngOnDestroy(){
    this.sub$.unsubscribe();
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

  ajust(){
    this.ngOnInit();
    setTimeout(()=> this.ngOnInit(), 500);
  }
}
