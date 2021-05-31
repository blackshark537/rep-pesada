import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  current_year  = new Date().getFullYear();
  current_month = new Date().getMonth();

  col1=[
    { prop: '', header:'FECHA CON CONTADOR DE TIEMPO' },
    { prop: '', header:`No. DE EMPRESAS DEDICADAS A LA CRIA DE REPROD. L`},
    { prop: '', header:`REPRODUCTORAS ASIGNADAS AÑO ${this.current_year}` },
    { prop: '', header:'TOTAL DE AVES EN RECRIA 0-18 SEMANAS' },
    { prop: '', header:'TOTAL DE AVES EN PRODUCCION 19-85 SEM.' },
    { prop: '', header:'POBLACION  DE REPRODUCTORAS' },
    { prop: '', header:'MORTALIDAD EN PROCESO' },
    { prop: '', header:'PRODUCCION DE HUEVOS TOTALES EN PROCESO' },
    { prop: '', header:'HUEVOS INCUBABLES EN PROCESO PROD.DIA' },
    { prop: '', header:'HUEVOS INCUBABLES ACUMULADOS DEL MES' },
    { prop: '', header:`INCUBACION DE HUEVOS ASIGNADOS PARA ${this.current_month}` },
    { prop: '', header:`TOTAL DE POLLITAS PROYECTADAS A NACER ${this.current_month}` },
    { prop: '', header:'TOTAL DE PRODUCTORES PROGRAMADOS ' },
  ]
constructor(){}
ngOnInit(){}
}