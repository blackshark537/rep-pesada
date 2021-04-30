import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-daily-projection',
  templateUrl: './daily-projection.page.html',
  styleUrls: ['./daily-projection.page.scss'],
})
export class DailyProjectionPage implements OnInit {
  table=true;
  year= new BehaviorSubject(new Date().getFullYear());
  rows=[];
  cols=[
    /* {prop: 'empresa', header: 'Nombre Comercial'},
    {prop: 'entrydate', header:'Fecha de Entrada'},
    {prop: 'balance', header: 'Balance'}, */
    {prop: 'jan', header: 'Enero'},
    {prop: 'feb', header: 'Febrero'},
    {prop: 'mar', header: 'Marzo'},
    {prop: 'apr', header: 'Abril'},
    {prop: 'may', header: 'Mayo'},
    {prop: 'jun', header: 'Junio'},
    {prop: 'jul', header: 'Julio'},
    {prop: 'ago', header: 'Agosto'},
    {prop: 'sep', header: 'Septiembre'},
    {prop: 'oct', header: 'Octubre'},
    {prop: 'nov', header: 'Noviembre'},
    {prop: 'dic', header: 'Diciembre'},
  ];
  constructor() { }

  ngOnInit() {
  }

  selected(event){}

}
