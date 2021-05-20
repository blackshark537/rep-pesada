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

  cols = [
    { number: false, prop: 'empresa' , header: 'Empresa y/o Productor'}, 
    { number: false, prop: 'direccion', header: 'Dirección' },
    { number: false, prop: 'telefono', header: 'Número de Teléfono' },
    { number: true, prop: 'cant_gallinas_asignadas', header: 'Cantidad de Gallinas Asignadas'}
  ];
  businesses = []
  constructor(
    private platform: Platform,
    private store: Store<AppModel>
  ) { }

  ngOnInit() {
    this.store.select('businesses').pipe(
      map(Businesses => Businesses.map(b =>{
        const {id, nombre_comercial, RNC, telefono, direccion, cant_gallinas_asignadas} = b
        return {
          id, 
          empresa: nombre_comercial,
          cant_gallinas_asignadas,
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
