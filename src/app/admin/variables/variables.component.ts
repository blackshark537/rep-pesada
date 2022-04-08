import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services';
import {
  iAprovHuevosDetails,
  iFormVariables,
  iMortalidadPollitos,
  iMortalidadProdDetails,
  iMortalidadRecriaDetails,
  iNacimientosDetails,
  iProdHuevosDetails
} from '../../models';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.scss'],
})
export class VariablesComponent implements OnInit {

  formVariables: FormGroup;
  mortalidad_recria_details: FormGroup;
  mortalidad_produccion_details: FormGroup;
  produccion_huevos_totales_details: FormGroup;
  aprovechamiento_huevos_details: FormGroup;
  nacimientos_details: FormGroup;
  mortalidad_pollitos_details: FormGroup;

  recriaSub = false;
  produccionSub = false;
  produccionHuevosSub = false;
  aprovechamientoSub = false;
  nacimientosSub = false;
  pollitosSub = false;
  abuelos_reproductoras = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    private apiService: ApiService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.abuelos_reproductoras = this.activatedRoute.snapshot.paramMap.get('abuelos') === 'true'? true : false;
    this.mortalidad_produccion_details = this.fb.group({
      baja_postura: 0,
      newcastle: 0,
      coriza: 0,
      colera: 0,
      influenza: 0,
      pneumovirus: 0,
      gallisepticum: 0,
      synoviae: 0,
      anemia: 0,
      viruela: 0,
      defi_nutricional: 0,
      clima: 0,
      otros: 0
    });

    this.mortalidad_recria_details = this.fb.group({
      gumboro: 0,
      newcastle: 0,
      clostridium: 0,
      influenza: 0,
      anemia: 0,
      viruela: 0,
      defi_nutricional: 0,
      clima: 0,
      otros: 0
    })

    this.produccion_huevos_totales_details = this.fb.group({
      baja_postura: 0,
      newcastle: 0,
      coriza: 0,
      colera: 0,
      influenza: 0,
      pneumovirus: 0,
      gallisepticum: 0,
      synoviae: 0,
      anemia: 0,
      viruela: 0,
      defi_nutricional: 0,
      clima: 0,
      otros: 0
    });

    this.aprovechamiento_huevos_details = this.fb.group({
      huevos_piso: 0,
      cama: 0,
      nidal: 0,
      baja_postura: 0,
      recoleccion: 0,
      defi_nutricional: 0,
      clima: 0
    });

    this.nacimientos_details = this.fb.group({
      gallos: 0,
      sobrepeso: 0,
      huevos_sucios: 0,
      contaminacion: 0,
      encefalomielitis: 0,
      clima: 0,
      defi_nutricional: 0,
    });

    this.mortalidad_pollitos_details = this.fb.group({
      newcastle: 0, 
      gumboro: 0,
      hepatitis: 0,
      influenza: 0,
      anemia: 0, 
      coccidiosis: 0,
      micoplasma: 0,
      calefaccion: 0,
      clima: 0, 
      defi_nutricional: 0
    });

    this.formVariables = this.fb.group({
      mortalidad_recria: [5, Validators.required],
      mortalidad_recria_details: this.mortalidad_recria_details,

      mortalidad_produccion: [10, Validators.required],
      mortalidad_produccion_details: this.mortalidad_produccion_details,

      produccion_huevos_totales: [5, Validators.required],
      produccion_huevos_totales_details: this.produccion_huevos_totales_details,

      aprovechamiento_huevos: [10, Validators.required],
      aprovechamiento_huevos_details: this.aprovechamiento_huevos_details,

      nacimientos: [1, Validators.required],
      nacimientos_details: this.nacimientos_details,

      mortalidad_pollitos: [0],
      mortalidad_pollitos_details: this.mortalidad_pollitos_details,

      edad_semanas: [65, [Validators.required,Validators.max(75), Validators.min(0)]]
    })

    this.apiService.get_variables(this.abuelos_reproductoras).subscribe(resp=>{
      console.log({...resp});
      this.formVariables.patchValue({...resp});
    });

  }


  getControl(name: string) {
    return this.formVariables.get(name).value
  }

  get mortalidad_recria_real(){
    const values = this.mortalidad_recria_details.value as iMortalidadRecriaDetails;
    const mortalidad = Object.values(values).reduce((pv,nx)=> pv+=nx, 0);
    return mortalidad + this.formVariables.get('mortalidad_recria').value;
  }

  get mortalidad_prod_real(){
    const values = this.mortalidad_produccion_details.value as iMortalidadProdDetails;
    const mortalidad = Object.values(values).reduce((pv,nx)=> pv+=nx, 0);
    return mortalidad + this.formVariables.get('mortalidad_produccion').value;
  }

  get produccion_huevos_totales_real(){
    const values = this.produccion_huevos_totales_details.value as iProdHuevosDetails;
    const mortalidad = Object.values(values).reduce((pv,nx)=> pv+=nx, 0);
    return mortalidad + this.formVariables.get('produccion_huevos_totales').value;
  }

  get aprovechamiento_huevos_real(){
    const values = this.aprovechamiento_huevos_details.value as iAprovHuevosDetails;
    const mortalidad = Object.values(values).reduce((pv,nx)=> pv+=nx, 0);
    return mortalidad + this.formVariables.get('aprovechamiento_huevos').value;
  }

  get nacimientos_real(){
    const values = this.nacimientos_details.value as iNacimientosDetails;
    const mortalidad = Object.values(values).reduce((pv,nx)=> pv+=nx, 0);
    return mortalidad + this.formVariables.get('nacimientos').value;
  }

  get pollitos_real(){
    const values = this.mortalidad_pollitos_details.value as iMortalidadPollitos;
    const mortalidad = Object.values(values).reduce((pv,nx)=> pv+=nx, 0);
    return mortalidad + this.formVariables.get('mortalidad_pollitos').value;
  }
  
  async confirm(): Promise<boolean>{
    let accept = false;
    const prompt = await this.alertCtrl.create({
      header: "Confirmar",
      message: "Aceptar para continuar",
      buttons:[
        {
          role: "cancel",
          text: "Cancel",
          handler: ()=> accept = true,
        },
        {
          handler: ()=> accept = true,
          text: "Aceptar",
        }
      ]
    });

    await prompt.present();
    await prompt.onWillDismiss();
    return accept;
  }

  async save(){
    const data = this.formVariables.value as iFormVariables;
    const conf = await this.confirm();
    
    if(data.edad_semanas > 75){
      alert('Error: La edad no puede ser mayor a 75 años');
      return;
    }

    if(conf) {
      
      if(this.abuelos_reproductoras){
        //delete pollitos nacidos
        delete data.mortalidad_pollitos_details;
        delete data.mortalidad_pollitos;
      }

      this.apiService.update_variables(data, this.abuelos_reproductoras).subscribe(resp=>{
        console.log('listo', resp);
        document.location.href = ''
      });
    }
  }
}
