import { Component, OnInit } from '@angular/core';
import { FinalcostsService } from 'src/app/services/helpers/finalcosts.service';

@Component({
  selector: 'app-elemento-costo',
  templateUrl: './elemento-costo.component.html',
  styleUrls: ['./elemento-costo.component.scss'],
})
export class ElementoCostoComponent implements OnInit {
  
  pTitle = 'Elemento De Costo';
  subtitle = `COSTO DE PRODUCCION DEL POLLO EN GRANJA`;
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
