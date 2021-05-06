import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { TableActions, TableEvent } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, LotService } from '../services';
import { LotInterface, LotProjection, LotResponse } from '../models';
import { Store } from '@ngrx/store';
import { AppModel } from '../models';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.page.html',
  styleUrls: ['./lot.page.scss'],
})
export class LotPage implements OnInit {

  lot$:  Observable<LotResponse[]>=of([]);
  tableActions: TableActions  = {
    open:   true,
    new:    false,
    delete: false
  }
  status={
    total:0,
    eggs:0
  }
  col$    = this.lotService.cols$;
  filter  =   "production";
/////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private platform:     Platform,
    private router:       Router,
    private activeRoute:  ActivatedRoute,
    private lotService:   LotService,
    private api: ApiService,
    private loading: LoadingController,
    private store:        Store<AppModel>
  ) { }
/////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.filter = this.activeRoute.snapshot.paramMap.get('id');
    this.lot$   = this.store.select('lots').pipe(
      map(a => a.filter(x => x.status ===  this.filter)),
      map(lots => {
        lots.forEach(lot=>{
          this.status.total+= lot.females//
          this.status.eggs+=parseInt(lot.production)
        });
        return lots;
      })
    )
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////
  get isMaterial() {
    return this.platform.is('ios')? false : true;
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////
  selected(evt: TableEvent) {
      if(evt.action === 'new')    return console.log("Create a new one : %s", evt.action)
      if(evt.action === 'open')   return this.open(evt.row);
      if(evt.action === 'delete') return this.delete(evt.row);
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////
  open(row){
    this.lotService.lot$.next(row);
    this.router.navigate(['/breeder'])
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////
  delete(row){
    this.lotService.deleteLot(row);
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////
}
