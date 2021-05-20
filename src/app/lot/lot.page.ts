import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { TableActions, TableEvent } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { LotService } from '../services';
import { LotResponse } from '../models';
import { Store } from '@ngrx/store';
import { AppModel } from '../models';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LotFormPage } from '../lot-form/lot-form.page';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.page.html',
  styleUrls: ['./lot.page.scss'],
})
export class LotPage implements OnInit {

  lot$:  Observable<LotResponse[]>=of([]);
  tableActions: TableActions  = {
    open:   true,
    new:    true,
    delete: false,
    edit: true
  }
  status={
    total:0,
    eggs:0,
    incub_eggs:0,
    born_eggs:0
  }
  col$    = this.lotService.cols$;
  filter  =   "production";
/////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private platform:     Platform,
    private router:       Router,
    private activeRoute:  ActivatedRoute,
    private lotService:   LotService,
    private modalCtrl: ModalController,
    private store:        Store<AppModel>
  ) { }
/////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.filter = this.activeRoute.snapshot.paramMap.get('id');
    this.lot$   = this.store.select('lots').pipe(
      map(a => a.filter(x => x.status ===  this.filter && this.lotService.daysBetween(x.entry, new Date()) < 596)),
      map(lots => {
        lots.forEach(lot=>{
          if(lot.id === 42)console.log(lot);
          this.status.total+= parseInt(lot.total)//
          this.status.eggs+=parseInt(lot.production)
          this.status.incub_eggs+=parseInt(lot.incubables)
          this.status.born_eggs+=parseInt(lot.nacimientos)
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
      if(evt.action === 'new')    this.router.navigate(['/lot-form'])
      if(evt.action === 'open')   return this.open(evt.row);
      if(evt.action === 'edit')   return this.edit(evt.row);
      if(evt.action === 'delete') return this.delete(evt.row);
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////
  async edit(row){
    const modal = await this.modalCtrl.create({
      component: LotFormPage,
      componentProps: {
        edit: true,
        Lot: row,
        id: row.lotId
      }
    });
    await modal.present();
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
