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

  cols = [{ prop: 'empresa' }, { prop: 'telefono' }, { prop: 'direccion' }];
  businesses = []
  constructor(
    private platform: Platform,
    private store: Store<AppModel>
  ) { }

  ngOnInit() {
    this.store.select('businesses').pipe(
      map(Businesses => Businesses.map(b =>{
        const {id, nombre_comercial, RNC, telefono, direccion} = b
        //const owner = b.perfil_usuario.nombres + ' ' + b.perfil_usuario.apellidos;
        return {
          id, 
          empresa: nombre_comercial,
          rnc: RNC,
          telefono,
          direccion,
          //owner
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
