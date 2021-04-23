import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppModel } from '../models';
import { TableEvent } from '../shared';

@Component({
  selector: 'app-business',
  templateUrl: './business.page.html',
  styleUrls: ['./business.page.scss'],
})
export class BusinessPage implements OnInit {

  cols = [{ prop: 'Company' }, { prop: 'RNC' }, { prop: 'Phone' }, { prop: 'Owner' }, { prop: 'Address' }];
  businesses = []
  constructor(
    private platform: Platform,
    private store: Store<AppModel>
  ) { }

  ngOnInit() {
    this.store.select('businesses').pipe(
      map(Businesses => Businesses.map(b =>{
        const {id, nombre_comercial, RNC, telefono, direccion} = b
        const owner = b.perfil_usuario.nombres + ' ' + b.perfil_usuario.apellidos;
        return {
          id, 
          company: nombre_comercial,
          rnc: RNC,
          phone: telefono,
          address: direccion,
          owner
        }
      }))
    ).subscribe(businesses =>{
      this.businesses = businesses;
    });
  }

  get isMaterial() {
    return this.platform.is('ios') ? false : true;
  }

  selected(evt: TableEvent) {
    console.log(evt.action)
  }
  
}
