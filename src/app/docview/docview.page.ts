import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-docview',
  templateUrl: './docview.page.html',
  styleUrls: ['./docview.page.scss'],
})
export class DocviewPage implements OnInit {
  title;
  pdfSrc=null;
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id === 'eggsPrices'){
       this.title  = 'ANALISIS DEL COSTO DE PRODUCCION';
       this.pdfSrc = 'assets/eggsPrices.pdf'
    }
    if(id === 'Commodities'){
      this.title = 'Precios de Commodities';
      this.pdfSrc = 'assets/soyaPrices.pdf'
    }
  }

}
