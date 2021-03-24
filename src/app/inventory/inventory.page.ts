import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TableEvent } from '../shared';
import Inventory from 'src/assets/data/inventory.json';

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
    this.inventory = Inventory.map(I=>{
      const {id, equipo, tipo, cantidad, fecha_compra, vida_util} = I;
      const { direccion } = I.capacidad_instalada
      return {
        id,
        item: equipo,
        quantity: cantidad + ' und',
        type: tipo,
        adquired: new Date(fecha_compra).toLocaleDateString(),
        timeExpected: vida_util + ' years',
      }
    });
  }

  get isMaterial() {
    return this.platform.is('ios') ? false : true;
  }

  selected(evt: TableEvent) {
    console.log(evt.action)
  }

}
