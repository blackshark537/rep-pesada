import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppModel } from '../models';
import { TableEvent } from '../shared';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {


  cols = [{ prop: 'nombres' }, { prop: 'apellidos' }, { prop: 'telefono' }, { prop: 'empresa' }, { prop: 'direccion' }];
  users = []
  constructor(
    private platform: Platform,
    private store: Store<AppModel>
  ) { }

  ngOnInit() {
    this.store.select('producers').pipe(
      map(producers => producers.map(val => {
        const { id, nombres, apellidos, telefono } = val;
        const { nombre_comercial, direccion } = val.empresa;
        return {
          id,
          nombres,
          apellidos,
          telefono,
          direccion,
          empresa: nombre_comercial
        };
      }))
    ).subscribe(producers => {
      this.users = producers
    });

  }

  get isMaterial() {
    return this.platform.is('ios') ? false : true;
  }

  selected(evt: TableEvent) {
    console.log(evt.action)
  }

}
