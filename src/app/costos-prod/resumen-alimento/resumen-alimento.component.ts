import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlimentoNucleoType, AlimentoNucleoTypeId, AlimentoService, AlimentoType, AlimentoTypeId } from 'src/app/services';

@Component({
  selector: 'app-resumen-alimento',
  templateUrl: './resumen-alimento.component.html',
  styleUrls: ['./resumen-alimento.component.scss'],
})
export class ResumenAlimentoComponent implements OnInit, AfterViewInit {

  pTitle: string = 'Resumen total de alimentos';
  foods: {type: string; usd: number; dop: number}[];
  nucleos: {type: string; usd: number; dop: number}[];
  constructor(
    private alimentoService: AlimentoService
  ) { 
    
  }

  async ngOnInit() {
    await this.alimentoService.compileResume();
    this.getResume();
  }

  ngAfterViewInit(): void {
  }

  getResume(){
    this.foods = [];
    Object.values(AlimentoType).forEach(async alim=>{
      const alimento = this.alimentoService.getResumenTotal(alim).find(el=> el.name.toLowerCase().includes("costo total"));
      this.foods.push({type: AlimentoTypeId[alim.toUpperCase()], ...alimento})
    });
    this.getResumenNucleos();
  }

  getResumenNucleos(){
    this.nucleos = [];
    Object.values(AlimentoNucleoType).forEach(alim=>{
      this.nucleos.push({type: AlimentoNucleoTypeId[alim],...this.alimentoService.getResumenTotalNucleo(alim).find(el=> el.name.toLowerCase().includes("costo total"))})
    });
  }

  get dateNow(){
    return new Date();
  }
}
