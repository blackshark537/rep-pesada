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

  getDop(item: any): number{
    if(!this.macros.length) return 0;
    return parseFloat((item.price * this.macros[0].price).toFixed(2));
  }

  get dateNow(){
    return this.alimentoService.dateNow;
  }

}
