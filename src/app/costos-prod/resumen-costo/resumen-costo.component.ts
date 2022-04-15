import { Component, OnInit } from '@angular/core';
import { FinalcostsService } from 'src/app/services/helpers/finalcosts.service';

@Component({
  selector: 'app-resumen-costo',
  templateUrl: './resumen-costo.component.html',
  styleUrls: ['./resumen-costo.component.scss'],
})
export class ResumenCostoComponent implements OnInit {

  
  pTitle = 'Resumen De Costos';
  subtitle = `Resumen De Costo De Producción Del Pollo En Granja`;
  cols=[];
  rows=[];

  constructor(
    private finalCosts: FinalcostsService
  ) { }

  async ngOnInit() {
    this.cols = this.finalCosts.getCols();
    this.rows = await this.finalCosts.getRows();
  }

  get dateNow(): Date{
    return new Date();
  }
}
