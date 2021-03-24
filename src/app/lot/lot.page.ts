import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TableEvent } from '../shared';
import { Router } from '@angular/router';
import { LotService } from '../services/lot/lot.service';
import { LotInterface } from '../models';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.page.html',
  styleUrls: ['./lot.page.scss'],
})
export class LotPage implements OnInit {

  cols = this.lotService.cols$;
  lots = this.lotService.getLots();

  constructor(
    private platform: Platform,
    private router: Router,
    private lotService: LotService
  ) { }

  ngOnInit() {
    
  }

  get isMaterial() {
    return this.platform.is('ios') ? false : true;
  }

  selected(evt: TableEvent) {
    switch(evt.action){
      case 'new':
        console.log(evt.action)
        break;
      case 'open':
        this.open(evt.row);
        break;
      case 'delete':
        this.delete(evt.row);
        break;
      default:
        break;
    }
  }

  open(row){
    this.lotService.lot$.next(row);
    this.router.navigate(['/production'])
  }

  delete(row){
    this.lotService.deleteLot(row);
  }

}
