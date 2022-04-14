import { Component } from '@angular/core';

@Component({
  selector: 'app-costos-prod',
  templateUrl: './costos-prod.page.html',
  styleUrls: ['./costos-prod.page.scss'],
})
export class CostosProdPage {

  pTitle: string = "costos de producción";

  menu:{name: string; url: string; icon: string}[] = [
    {name: 'Parametros Tecnicos', url: 'parametros-tecnicos', icon: '/assets/icon/filtrar.png'},
    {name: 'Comportamiento del Precio del maíz', url: 'costos-maiz', icon: '/assets/icon/corn.png'},
    {name: 'Comportamiento del Precio de la soya', url: 'costos-soya', icon: '/assets/icon/soyabean.png'},
    {name: 'Costos de los insumos', url: 'costos-insumos', icon: '/assets/icon/commodity.png'},
    {name: 'Alimento Pre-Iniciador', url: 'alimento/pre-iniciador', icon: '/assets/icon/bird-food (1).png'},
    {name: 'Alimento Iniciador', url: 'alimento/iniciador', icon: '/assets/icon/bird-food (4).png'},
    {name: 'Alimento Crecimiento', url: 'alimento/crecimiento', icon: '/assets/icon/bird-food (3).png'},
    {name: 'Alimento Pollos De Engorde', url: 'alimento/engorde', icon: '/assets/icon/bird-food (2).png'},
    {name: 'Alimento Finalizador De Pollos', url: 'alimento/finalizador', icon: '/assets/icon/bird-food (5).png'},
    {name: 'Resumen Coste De Alimentos', url: 'resumen/alimento', icon:'/assets/icon/bird-food (2).png'},
    {name: 'Tabla De Alimentos', url: 'tabla/alimento', icon:'/assets/icon/search.png'},
    {name: 'Costos De Producción', url: 'elemento-costo', icon: '/assets/icon/invoice.png'}
  ];

}
