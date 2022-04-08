import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlimentoNucleoType, AlimentoService, AlimentoType, AlimentoTypeId } from 'src/app/services';

@Component({
  selector: 'app-resumen-alimento',
  templateUrl: './resumen-alimento.component.html',
  styleUrls: ['./resumen-alimento.component.scss'],
})
export class ResumenAlimentoComponent implements OnInit, AfterViewInit {

  pTitle: string = 'Resumen total de alimentos';
  foods: {type: string; usd: number; dop: number}[];
  constructor(
    private alimentoService: AlimentoService
  ) { 
    
  }

  async ngOnInit() {
    await this.alimentoService.compileResume();
  }

  ngAfterViewInit(): void {
    this.getResume();
  }

  getResume(){
    this.foods = [];
    Object.values(AlimentoType).forEach(alim=>{
      this.foods.push({type: AlimentoTypeId[alim.toUpperCase()],...this.alimentoService.getResumenTotal(alim).find(el=> el.name.toLowerCase().includes("costo total"))})
    });
    this.getResumenNucleos();
  }

  getResumenNucleos(){
    Object.values(AlimentoNucleoType).forEach(alim=>{
      this.foods.push({type: AlimentoTypeId[alim.toUpperCase()],...this.alimentoService.getResumenTotalNucleo(alim).find(el=> el.name.toLowerCase().includes("costo total"))})
    });
    this.getResume();
  }

  get dateNow(){
    return new Date();
  }
}
