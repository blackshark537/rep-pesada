import { Component, OnDestroy, OnInit } from '@angular/core';
import { CostsService } from 'src/app/services';

@Component({
  selector: 'app-costo-maiz',
  templateUrl: './costo-maiz.component.html',
  styleUrls: ['./costo-maiz.component.scss'],
})
export class CostoMaizComponent implements OnInit, OnDestroy {

  pTitle: string = "Comportamiento del Precio del maíz";
  data_precio_maiz = [];

  constructor(
    private costsService: CostsService
  ) { }

  async ngOnInit() {
    this.data_precio_maiz = await this.costsService.getMaizTable();
  }

  ngOnDestroy(): void {
    this.costsService.unsubscribe();  
  }

  getDop(item): number{
    if(!this.data_precio_maiz.length) return 0;
    return parseFloat((item.value * this.data_precio_maiz[0].value).toFixed(2))
  }

  get afterMortality(){
    return this.costsService.pollos_recibidos - (this.costsService.pollos_recibidos * (this.costsService.mortalidad *100)/100)/100;
  }

  get dateNow(){
    return this.costsService.dateNow;
  }

}
