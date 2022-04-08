import { Component, OnDestroy, OnInit } from '@angular/core';
import { CostsService } from 'src/app/services';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.scss'],
})
export class ParametrosComponent implements OnInit, OnDestroy {

  pTitle: string = "Parametros Tecnicos";
  data_tecnica = [];

  constructor(
    private costsService: CostsService,
  ) { }

  ngOnInit() {
    this.data_tecnica = this.costsService.getParametros();
  }
  
  ngOnDestroy(): void {
    this.costsService.unsubscribe();  
  }

  applyMortality(){
    this.data_tecnica[3].value = this.afterMortality;
  }

  get month(){
    return this.costsService.Month;
  }

  get dateNow(){
    return this.costsService.dateNow;
  }

  get afterMortality(){
    return this.costsService.pollos_recibidos - (this.costsService.pollos_recibidos * (this.costsService.mortalidad *100)/100)/100;
  }

}
