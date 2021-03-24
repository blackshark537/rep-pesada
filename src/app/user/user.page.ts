import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import Users from 'src/assets/data/user.json';
import { TableEvent } from '../shared';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {


  cols = [{ prop: 'Firstname' }, { prop: 'Lastname' }, { prop: 'Phone' }, { prop: 'Company' }, { prop: 'Address' }];
  users = []
  constructor(
    private platform: Platform
  ) { }

  ngOnInit() {
    this.users = Users.filter(x => x['empresa'] != null).map(val => {
      const { id, nombres, apellidos, telefono } = val;
      const { nombre_comercial, direccion } = val.empresa;
      return {
        id,
        firstname: nombres,
        lastname: apellidos,
        phone: telefono,
        company: nombre_comercial,
        address: direccion
      };

    });

  }

  get isMaterial() {
    return this.platform.is('ios') ? false : true;
  }

  selected(evt: TableEvent) {
    console.log(evt.action)
  }

}
