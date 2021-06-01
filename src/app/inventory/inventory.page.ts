import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TableEvent } from '../shared';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  cols = [{ prop: 'Item' }, {prop: 'Type'}, { prop: 'Quantity' }, { prop: 'Adquired' }, { prop: 'TimeExpected' }];
  inventory = []
  constructor(
    private platform: Platform
  ) { }

  ngOnInit() {
  }
  get isMaterial() {
    return this.platform.is('ios') ? false : true;
  }

  selected(evt: TableEvent) {
    console.log(evt.action)
  }

}
