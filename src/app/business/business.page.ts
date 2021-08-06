import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  title='';
  subtitle='';
  cols = [
    /* { number: false, prop: 'index' , header: 'No.'},  */
    { number: false, prop: 'empresa' , header: 'Empresa y/o Productor'}, 
    { number: false, prop: 'direccion', header: 'Dirección' },
    { number: false, prop: 'telefono', header: 'Número de Teléfono' },
    { number: true, prop: 'cant_gallinas_asignadas', header: 'Cantidad Asignadas'}
  ];
  businesses = []
  balanceTotal=0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
    private store: Store<AppModel>
  ) { }

  ngOnInit() {
    const filtro = this.activatedRoute.snapshot.paramMap.get('filter');
    if(filtro==='abuelos'){
      this.title='Registro de Empresas Genéticas';
      this.subtitle='Empresas Genéticas con Asignación de Rep. Abuelas';
    } else {
      this.title='Registro de los Productores';
      this.subtitle='Productores con Asignación de Rep. Pesada';
    }
    this.store.select('businesses').pipe(
      map(Businesses => Businesses.filter(b=> b.empresa_type === filtro).map((b, i)=>{
        const {id, nombre_comercial, RNC, telefono, direccion, cant_gallinas_asignadas} = b;
        this.balanceTotal+= parseInt(cant_gallinas_asignadas);
        return {
          id: i+1,
          empresa: nombre_comercial,
          cant_gallinas_asignadas,
          telefono,
          direccion,
          //owner
        }
      }))
    ).subscribe(businesses =>{
      this.businesses = businesses;
      this.businesses.push({
        id: null,
        empresa: null,
        cant_gallinas_asignadas: this.balanceTotal,
        telefono: 'TOTAL AVES => ',
        direccion: null,
      })
    });
  }

  get isMaterial() {
    return this.platform.is('ios') ? false : true;
  }

  selected(evt: TableEvent) {
    console.log(evt.action)
  }
  
}
