import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TableActions, TableEvent } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { LotService } from '../services';
import { LotsResponse } from '../models';
import { Store } from '@ngrx/store';
import { AppModel } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.page.html',
  styleUrls: ['./lot.page.scss'],
})
export class LotPage implements OnInit {

  lot$:  Observable<LotsResponse[]>;
  tableActions: TableActions  = {
    open:   true,
    new:    false,
    delete: false
  }
  col$    = this.lotService.cols$;
  filter  =   "production";
/////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private platform:     Platform,
    private router:       Router,
    private activeRoute:  ActivatedRoute,
    private lotService:   LotService,
    private store:        Store<AppModel>
  ) { }
/////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.activeRoute.paramMap.subscribe(res=>{
      this.filter =   res.get('id');
      this.lot$   =   this.store.select('lots').pipe(
        map(a     =>  a.filter(x => x.status ===  this.filter))
      );
    });
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
