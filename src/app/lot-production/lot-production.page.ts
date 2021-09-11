import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LotResponse, LotType } from '../models';
import { ApiService } from '../services';
import { TableActions, TableEvent } from '../shared';

@Component({
  selector: 'app-lot-production',
  templateUrl: './lot-production.page.html',
  styleUrls: ['./lot-production.page.scss'],
})
export class LotProductionPage implements OnInit {

  year = new Date().getFullYear();
  cols = [
    { prop: 'fecha_entrada', header: 'Fecha de<br>Entrada' },
    { prop: 'cant_gallinas_asignadas', header: 'Aves<br>Recibidas' },
    { prop: 'seccion', header: 'Sección' },
    { prop: 'nave', header: 'Nave' },
    /* { prop: 'week', header: 'Edad en<br>Semanas' }, */
  ];
  lots: LotResponse[] = [];

  tableActions: TableActions  = {
    open:   true,
    new:    false,
    delete: false,
    edit: false
  }

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.apiService.getLots_Pesada(this.year).subscribe(resp => this.lots = resp.map(l=> {
      let fecha =new Date(l.fecha_entrada);
      l.fecha_entrada = fecha;
      return l; 
    }));
  }

  selected(evt: TableEvent) {
    if(evt.action === 'new')    this.router.navigate([`/forms/lots/new/${LotType.PESADA}`]);
    if(evt.action === 'open')   this.router.navigate([`/daily-production/${evt.row.id}`]);
    //if(evt.action === 'edit')   return //this.edit(evt.row);
    //if(evt.action === 'delete') return this.delete(evt.row);
  }
}
