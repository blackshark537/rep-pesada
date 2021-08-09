import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-lot',
  templateUrl: './detail-lot.page.html',
  styleUrls: ['./detail-lot.page.scss'],
})
export class DetailLotPage implements OnInit {

  title='CONTROL DE PRODUCCION Y CONSUMO ALIMENTO SEMANAL';
  lotId=54;
  constructor() { }

  ngOnInit() {
  }

}
