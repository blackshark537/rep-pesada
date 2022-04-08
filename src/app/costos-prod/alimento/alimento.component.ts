import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlimentoService, AlimentoNucleoType, AlimentoType, AlimentoTypeId } from 'src/app/services';

@Component({
  selector: 'app-alimento',
  templateUrl: './alimento.component.html',
  styleUrls: ['./alimento.component.scss'],
})
export class AlimentoComponent implements OnInit {

  pTitle: string = "Alimento ";
  subtitle1: string = '';
  subtitle2: string = 'Costos Núcleos y Sus Ingredientes';
  cols=[];
  rows = [];
  nucleo=[];
  total_nucleos =[];
  total_alimentos =[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private alimentoService: AlimentoService,
  ) { }

  async ngOnInit() {
    const alimentoId = this.activatedRoute.snapshot.paramMap.get('id');
    await this.alimentoService.compileAlimento(alimentoId);
    this.setSubTitle(alimentoId);
    this.pTitle += alimentoId;
    this.cols = this.alimentoService.getCols();
  }

  setSubTitle(alimentoId: string) {
    switch (alimentoId) {
      case AlimentoTypeId.PRE:
        this.subtitle1 = 'Formulas De Alimentos Pre-Iniciador Pollos';
        this.rows = this.alimentoService.getAlimento(AlimentoType.PRE);
        this.nucleo = this.alimentoService.getNucleo(AlimentoNucleoType.PRE);
        this.total_alimentos = this.alimentoService.getResumenTotal(AlimentoType.PRE);
        this.total_nucleos = this.alimentoService.getResumenTotalNucleo(AlimentoNucleoType.PRE);
        break;
      case AlimentoTypeId.INI:
        this.subtitle1 = 'Formulas De Alimentos Iniciador Pollos';
        this.rows = this.alimentoService.getAlimento(AlimentoType.INI);
        this.nucleo = this.alimentoService.getNucleo(AlimentoNucleoType.INI);
        this.total_alimentos = this.alimentoService.getResumenTotal(AlimentoType.INI);
        this.total_nucleos = this.alimentoService.getResumenTotalNucleo(AlimentoNucleoType.INI);
        break;
      case AlimentoTypeId.CRE:
        this.subtitle1 = 'Formulas De Alimentos Crecimiento Pollos';
        this.rows = this.alimentoService.getAlimento(AlimentoType.CRE);
        this.nucleo = this.alimentoService.getNucleo(AlimentoNucleoType.CRE);
        this.total_alimentos = this.alimentoService.getResumenTotal(AlimentoType.CRE);
        this.total_nucleos = this.alimentoService.getResumenTotalNucleo(AlimentoNucleoType.CRE);
        break;
      case AlimentoTypeId.ENG:
        this.subtitle1 = 'Formulas De Alimentos Engorde De Pollos';
        this.rows = this.alimentoService.getAlimento(AlimentoType.ENG);
        this.nucleo = this.alimentoService.getNucleo(AlimentoNucleoType.ENG);
        this.total_alimentos = this.alimentoService.getResumenTotal(AlimentoType.ENG);
        this.total_nucleos = this.alimentoService.getResumenTotalNucleo(AlimentoNucleoType.ENG);
        break;
      case AlimentoTypeId.FIN:
        this.subtitle1 = 'Formulas De Alimentos Finalizador De Pollos';
        this.rows = this.alimentoService.getAlimento(AlimentoType.FIN);
        this.nucleo = this.alimentoService.getNucleo(AlimentoNucleoType.FIN);
        this.total_alimentos = this.alimentoService.getResumenTotal(AlimentoType.FIN);
        this.total_nucleos = this.alimentoService.getResumenTotalNucleo(AlimentoNucleoType.FIN);
        break;
      default:
        break;
    }
  }

  get dateNow(): Date{
    return new Date();
  }
}