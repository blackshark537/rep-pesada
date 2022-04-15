import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CostosProdPage } from './costos-prod.page';
import { CostoMaizComponent } from './costo-maiz/costo-maiz.component';
import { CostoSoyaComponent } from './costo-soya/costo-soya.component';
import { ParametrosComponent } from './parametros/parametros.component';
import { ElementoCostoComponent } from './elemento-costo/elemento-costo.component';
import { CostoInsumosComponent } from './costo-insumos/costo-insumos.component';
import { AlimentoComponent } from './alimento/alimento.component';
import { TablaAlimentoComponent } from './tabla-alimento/tabla-alimento.component';
import { ResumenAlimentoComponent } from './resumen-alimento/resumen-alimento.component';
import { ResumenCostoComponent } from './resumen-costo/resumen-costo.component';

const routes: Routes = [
  {
    path: '',
    component: CostosProdPage
  },
  {
    path: 'parametros-tecnicos',
    component: ParametrosComponent
  },
  {
    path: 'costos-maiz',
    component: CostoMaizComponent
  },
  {
    path: 'costos-soya',
    component: CostoSoyaComponent
  },
  {
    path: 'costos-insumos',
    component: CostoInsumosComponent
  },
  {
    path: 'elemento-costo',
    component: ElementoCostoComponent
  },
  {
    path: 'elemento-costo/:table',
    component: ElementoCostoComponent
  },
  {
    path: 'resumen-costos',
    component: ResumenCostoComponent
  },
  {
    path: 'alimento/:id',
    component: AlimentoComponent
  },
  {
    path: 'resumen/alimento',
    component: ResumenAlimentoComponent
  },
  {
    path: 'tabla/alimento',
    component: TablaAlimentoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CostosProdPageRoutingModule {}
