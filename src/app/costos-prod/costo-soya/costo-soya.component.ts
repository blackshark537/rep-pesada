import { Component, OnDestroy, OnInit } from '@angular/core';
import { CostsService } from 'src/app/services';

@Component({
  selector: 'app-costo-soya',
  templateUrl: './costo-soya.component.html',
  styleUrls: ['./costo-soya.component.scss'],
})
export class CostoSoyaComponent implements OnInit, OnDestroy {

  pTitle: string = "Comportamiento del Precio de la Soya";
  data_precio_soya = []

  constructor(
    private costsService: CostsService
  ) { }

  async ngOnInit() {
    this.data_precio_soya = await this.costsService.getSoyaTable();
  }

  ngOnDestroy(): void {
    this.costsService.unsubscribe();  
  }

  get month(){
    return this.costsService.Month;
  }

  get dateNow(){
    return this.costsService.dateNow;
  }

}
