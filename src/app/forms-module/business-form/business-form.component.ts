import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services';

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.scss'],
})
export class BusinessFormComponent implements OnInit {
  @Input('edit') edit=false;
  @Input('id') id=null;
  title='';
  businessForm: FormGroup;
  constructor(
    private apiService: ApiService,
    private modalCtrl: ModalController,
    private loadCtrl: LoadingController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    const empresa_type=this.activatedRoute.snapshot.paramMap.get('business_type');
    this.title = empresa_type==='abuelos'? 'Abuelos Progenitores' : 'Rep. Pesada';
    this.businessForm = this.fb.group({
      nombre_comercial: ['',Validators.required],
      telefono: [null, Validators.required],
      direccion: [null, Validators.required],
      provincia: [null, Validators.required],
      correo: [null, Validators.email],
      inicio_de_operaciones:[null],
      RNC: [null],
      owner_email: [''],
      perfil_usuario: [null],
      cant_gallinas_asignadas: [null, Validators.required],
      empresa_type:[empresa_type]
    });
  }

  getControl(key: string){
    return this.businessForm.get(key);
  }

  async post(){
    let load = await this.loadCtrl.create();
    await load.present();
    this.apiService.postBusiness(this.businessForm.value).subscribe(resp =>{
      load.dismiss();
      this.router.navigate(['/menu']);
      location.href = '/';
      this.dismiss();
    }, error => load.dismiss())
  }

  async put(){
    let load = await this.loadCtrl.create();
    await load.present();
    this.apiService.updateBusiness(this.id, this.businessForm.value).subscribe(resp =>{
      load.dismiss();
      this.router.navigate(['/menu']);
      location.href = '/';
      this.dismiss();
    }, error => load.dismiss());
  }

  async dismiss(){
    this.businessForm.reset();
    this.edit = false;
    await this.modalCtrl.dismiss();
  }

}
