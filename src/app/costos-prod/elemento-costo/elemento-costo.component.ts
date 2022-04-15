import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  showTable = false;
  resume = [];

  constructor(
    private finalCosts: FinalcostsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.cols = this.finalCosts.getCols();
    this.rows = await this.finalCosts.getRows();
    this.resume = await this.finalCosts.getResume();
    let table = this.activatedRoute.snapshot.paramMap.get('table');
    if(table === '1') this.showTable = true;
  }

  get dateNow(): Date{
    return new Date();
  }
}
