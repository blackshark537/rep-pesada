import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { TableActions, TableEvent } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { LotService } from '../services';
import { LotModel, LotResponse } from '../models';
import { Store } from '@ngrx/store';
import { AppModel } from '../models';
import { interval, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LotFormPage } from '../lot-form/lot-form.page';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.page.html',
  styleUrls: ['./lot.page.scss'],
})
export class LotPage implements OnInit, OnDestroy {
  slideOpts = {
    initialSlide: 3,
    speed: 600,
    slidesPerView: 4,
    autoplay: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };
  slides=true;
  lot$:  Observable<LotModel[]>=of([]);
  sub$: Subscription;
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
  col$;
  filter  =   "production";
  time = new Date();
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
    this.configSlides();
    addEventListener('resize', ev=>{
      ev.preventDefault();
      this.configSlides();
    });

    this.sub$ = interval(1000).subscribe(()=> this.time = new Date());
    this.filter = this.activeRoute.snapshot.paramMap.get('id');
    this.col$ = this.filter === 'breeding'? this.lotService.colsBreading$ : this.lotService.cols$;
    this.lot$   = this.store.select('lots').pipe(
      map(a => a.filter(x => x.status ===  this.filter && this.lotService.daysBetween(x.entry, new Date()) < 596)),
      map(lots => {
        lots.forEach(lot=>{
          if(lot.id === 42)console.log(lot);
          this.status.total+= lot.total;
          this.status.eggs+=lot.production;
          this.status.incub_eggs+=lot.incubables;
          this.status.born_eggs+=lot.nacimientos;
        });
        return lots;
      })
    )
  }

  ngOnDestroy(){
    this.sub$.unsubscribe();
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////
  get isMaterial() {
    return this.platform.is('ios')? false : true;
  }

  configSlides(){
    if(window.innerWidth < 500){
      this.slideOpts.slidesPerView = 1;
      this.resetSlides();
      return;
    }
    if(window.innerWidth > 500 && window.innerWidth < 1000){
      this.slideOpts.slidesPerView = 3;
      this.resetSlides();
      return;
    }
    if(window.innerWidth > 1000){
      this.slideOpts.slidesPerView = 4;
      this.resetSlides();
      return;
    }
  }

  resetSlides(){
    this.slides=false;
    setTimeout(()=> this.slides=true, 1);
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
