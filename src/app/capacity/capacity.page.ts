import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TableEvent } from '../shared';
import Capacities from 'src/assets/data/capacity.json';

@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.page.html',
  styleUrls: ['./capacity.page.scss'],
})
export class CapacityPage implements OnInit {

  cols = [{ prop: 'Enviroment' }, { prop: 'Company' }, { prop: 'Phone' }, { prop: 'Area' }, { prop: 'Address' }];
  capacities = []
  constructor(
    private platform: Platform
  ) { }

  ngOnInit() {
    this.capacities = Capacities.map(c =>{
      const {id, ambiente, direccion} = c;
      const { ancho, largo} = c.area;
      const { nombre_comercial, telefono } = c.empresa
      return {
        id,
        enviroment: ambiente,
        area: (parseInt(ancho)*parseInt(largo) )+ 'mt',
        company: nombre_comercial,
        phone: telefono,
        address: direccion
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
