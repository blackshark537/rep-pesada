import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TableEvent } from '../shared';
import { Router } from '@angular/router';
import { LotService } from '../services/lot/lot.service';
import { LotInterface, LotsResponse } from '../models';
import { Store } from '@ngrx/store';
import { AppModel } from '../models/AppModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.page.html',
  styleUrls: ['./lot.page.scss'],
})
export class LotPage implements OnInit {

  cols = this.lotService.cols$;
  lot$: Observable<LotsResponse[]>

  constructor(
    private platform: Platform,
    private router: Router,
    private lotService: LotService,
    private store: Store<AppModel>
  ) { }

  ngOnInit() {
    this.lot$ = this.store.select('lots');
  }

  get isMaterial() {
    return this.platform.is('ios') ? false : true;
  }

  selected(evt: TableEvent) {
      if(evt.action === 'new') return console.log(evt.action)
      if(evt.action === 'open') return this.open(evt.row);
      if(evt.action === 'delete') return this.delete(evt.row);
  }

  open(row){
    this.lotService.lot$.next(row);
    this.router.navigate(['/breeder'])
  }

  delete(row){
    this.lotService.deleteLot(row);
  }

}
