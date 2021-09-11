import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductionInterface } from 'src/app/models';
import { ApiService } from 'src/app/services';

@Component({
  selector: 'app-daily-prod-form',
  templateUrl: './daily-prod-form.component.html',
  styleUrls: ['./daily-prod-form.component.scss'],
})
export class DailyProdFormComponent implements OnInit {

  productionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productionForm = this.fb.group({
      fecha: [new Date(), Validators.required],
      inicio_dia: [null, Validators.required],
      mortalidad: [null, Validators.required],
      descarte: [null, Validators.required],
      venta: [null, Validators.required],
      final_dia: [null, Validators.required],
      grs_alimento: [null, Validators.required],
      total_alimento: [null, Validators.required],
      huevos_incubables: [null, Validators.required],
      huevos_dobles: [null, Validators.required],
      huevos_sucios: [null, Validators.required],
      huevos_comerciables: [null, Validators.required],
      huevos_rotos: [null, Validators.required],
      huevos_totales: [null, Validators.required],
      peso: [null, Validators.required],
      produccion: [null, Validators.required],
      aprovechamiento: [null, Validators.required],
      lote: [null, Validators.required],
      semana: [null, Validators.required],
    });

    const fecha = this.activatedRoute.snapshot.paramMap.get('fecha');
    const lotId = this.activatedRoute.snapshot.paramMap.get('lote');
    const week = this.activatedRoute.snapshot.paramMap.get('semana');
    const day_init = this.activatedRoute.snapshot.paramMap.get('day-init');
    this.productionForm.patchValue({
      lote: lotId,
      semana: week,
      fecha,
      inicio_dia: day_init? day_init : null
    });
  }

  getControl(name: string){
    return this.productionForm.get(name);
  }

  setDate(date){
    console.log(date)
  }

  save(){
    const value = this.productionForm.value as ProductionInterface;
    this.apiService.post_daily_production(value).subscribe(resp =>{
      this.productionForm.reset();
      this.router.navigate(['../']);
    });
  }

}
