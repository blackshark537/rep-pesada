import { Component, OnInit } from '@angular/core';
import { InsumosService } from 'src/app/services';

@Component({
  selector: 'app-costo-insumos',
  templateUrl: './costo-insumos.component.html',
  styleUrls: ['./costo-insumos.component.scss'],
})
export class CostoInsumosComponent implements OnInit {

  pTitle: string = "Precio De Los Insumos";
  micros = [];
  macros = [];
  constructor(
    private alimentoService: InsumosService,
  ) { }

  async ngOnInit() {
    this.micros = this.alimentoService.getMicros();
    this.macros = await this.alimentoService.getMacros();
  }

  ngOnDestroy(): void {
    this.alimentoService.unsubscribe();
  }

  get dateNow(){
    return this.alimentoService.dateNow;
  }

}
