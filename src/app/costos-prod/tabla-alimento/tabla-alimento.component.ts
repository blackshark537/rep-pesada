import { Component, OnDestroy, OnInit } from '@angular/core';
import { TablaAlimentoService } from 'src/app/services';

@Component({
  selector: 'app-tabla-alimento',
  templateUrl: './tabla-alimento.component.html',
  styleUrls: ['./tabla-alimento.component.scss'],
})
export class TablaAlimentoComponent implements OnInit, OnDestroy {
  
  pTitle="Tabla de alimentos";
  subtitle1="";

  constructor(
    public tablaAlimentoService: TablaAlimentoService
  ) { }

  async ngOnInit() {
    await this.tablaAlimentoService.compileTable();
    const pollos = await this.tablaAlimentoService.getPollitosNacidos();
    this.subtitle1 = "Proyeccion Tabla De Alimentos Para " + this.transform(pollos) + " Pollitos Nacidos";
  }

  ngOnDestroy(): void {
      this.tablaAlimentoService.clear();
  }

  private transform(value: string | number): string {
    if(!value) return '0';
    return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  get dateNow(): Date{
    return new Date();
  }
}
