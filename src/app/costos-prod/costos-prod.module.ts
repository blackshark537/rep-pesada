import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CostosProdPageRoutingModule } from './costos-prod-routing.module';

import { CostosProdPage } from './costos-prod.page';
import { SharedModule } from '../shared/shared.module';
import { CostoMaizComponent } from './costo-maiz/costo-maiz.component';
import { CostoSoyaComponent } from './costo-soya/costo-soya.component';
import { ParametrosComponent } from './parametros/parametros.component';
import { ElementoCostoComponent } from './elemento-costo/elemento-costo.component';
import { CostoInsumosComponent } from './costo-insumos/costo-insumos.component';
import { AlimentoComponent } from './alimento/alimento.component';
import { TablaAlimentoComponent } from './tabla-alimento/tabla-alimento.component';
import { ResumenAlimentoComponent } from './resumen-alimento/resumen-alimento.component';
import { ResumenCostoComponent } from './resumen-costo/resumen-costo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CostosProdPageRoutingModule
  ],
  declarations: [
    CostosProdPage, 
    CostoMaizComponent, 
    CostoSoyaComponent, 
    ParametrosComponent,
    ElementoCostoComponent,
    CostoInsumosComponent,
    AlimentoComponent,
    TablaAlimentoComponent,
    ResumenAlimentoComponent,
    ResumenCostoComponent
  ]
})
export class CostosProdPageModule {}
