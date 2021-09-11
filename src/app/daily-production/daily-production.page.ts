import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { ProductionInterface } from '../models';
import { ApiService } from '../services';
import { TableActions, TableEvent } from '../shared';

@Component({
  selector: 'app-daily-production',
  templateUrl: './daily-production.page.html',
  styleUrls: ['./daily-production.page.scss'],
})
export class DailyProductionPage implements OnInit {

  cols = [
    { prop: 'fecha', header: 'Fecha' },
    { prop: 'huevos_incubables', header: 'Huevos Incubables' },
    { prop: 'huevos_dobles', header: 'huevos_dobles' },
    { prop: 'huevos_sucios', header: 'huevos_sucios' },
    { prop: 'huevos_comerciables', header: 'huevos_comerciables' },
    { prop: 'huevos_rotos', header: 'huevos_rotos' },
    { prop: 'huevos_totales', header: 'huevos_totales' },
  ];
  lots = [];
  tableActions: TableActions  = {
    open:   true,
    new:    false,
    delete: false,
    edit: false
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    const lot = parseInt(this.activatedRoute.snapshot.paramMap.get('lot'));
    this.apiService.get_daily_prod_meta(lot).pipe(
      map(action =>{
        let result = [];
        action.map(metas =>{
          let hi=0;
          let hd =0;
          let hr =0;
          let hs =0;
          let hc =0;
          let ht = 0;
          metas.daily_productions.forEach(p =>{
            hi+= parseInt(p.huevos_incubables);
            hd+= parseInt(p.huevos_dobles);
            hs+= parseInt(p.huevos_sucios);
            hr+= parseInt(p.huevos_rotos);
            hc+=parseInt(p.huevos_comerciables);
            ht=hi+hd+hs+hr+hc;
          });
          result.push({
            id: metas.id,
            fecha: new Date(metas.fecha),
            lote: metas.lote,
            huevos_incubables: hi,
            huevos_dobles: hd,
            huevos_sucios: hs,
            huevos_comerciables: hc,
            huevos_rotos: hr,
            huevos_totales: ht,
          })
        })
        return result;
      })
    ).subscribe(resp =>{
      this.lots = resp;
    })
  }

  selected(evt: TableEvent) {
    const d = evt.row;
    //if(evt.action === 'new')    this.router.navigate([`/forms/lots/new/${LotType.PESADA}`]);
    if(evt.action === 'open')   this.router.navigate([`/fecha/${d.fecha}/detail-lot/${d.lote}/week/1`]);
    //if(evt.action === 'edit')   return //this.edit(evt.row);
    //if(evt.action === 'delete') return this.delete(evt.row);
  }
}
