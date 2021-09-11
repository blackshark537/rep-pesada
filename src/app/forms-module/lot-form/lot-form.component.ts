import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppModel, BusinessInterface, LotModel, LotResponse } from '../../models';
import { ApiService } from '../../services';
import { LotsActions } from '../../actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lot-form',
  templateUrl: './lot-form.component.html',
  styleUrls: ['./lot-form.component.scss'],
})
export class LotFormComponent implements OnInit {

  @Input('edit') edit = false;
  @Input('id') id = null;
  @Input('Lot') Lot: LotModel;


  loteForm: FormGroup;
  cantidad = {
    hembras: 1000,
    machos: 100
  }

  business$: Observable<BusinessInterface[]>
  title='';
  lot_type=null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private loadCtrl: LoadingController,
    private modalCtrl: ModalController,
    private store: Store<AppModel>
  ) { }

  ngOnInit() {
    const lot_type = this.activatedRoute.snapshot.paramMap.get('lot_type');
    this.lot_type = lot_type;
    this.title = lot_type==='abuelos'? 'Abuelos Progenitores' : 'Rep. Pesada';
    this.business$ = this.store.select('businesses');
    this.loteForm = this.fb.group({
      fecha_entrada: [new Date(), Validators.required],
      variable_mortalidad_recria: [null, Validators.required],
      variable_mortalidad_produccion: [null, Validators.required],
      variable_produccion_huevos_totales: [null, Validators.required],
      variable_aprovechamiento_huevos: [null, Validators.required],
      variable_nacimiento: [null, Validators.required],
      month: [null, Validators.required],
      year: [null, Validators.required],
      cant_gallinas_asignadas: [null, Validators.required],
      empresa: [null],
      cantidad: [null, Validators.required],
      lote_type: [lot_type],
      nave: [null],
      seccion: [null]
    })
    if(this.edit){
      this.loteForm.patchValue({
        fecha_entrada: this.Lot.entry,
        variable_mortalidad_recria: this.Lot.variable_mortalidad_recria,
        variable_mortalidad_produccion: this.Lot.variable_mortalidad_produccion,
        variable_produccion_huevos_totales: this.Lot.variable_produccion_huevos_totales,
        variable_aprovechamiento_huevos: this.Lot.variable_nacimiento,
        variable_nacimiento: this.Lot.variable_nacimiento,
        month: this.Lot.entry.getMonth()+1,
        year: this.Lot.entry.getFullYear(),
        cant_gallinas_asignadas: this.Lot.cant_gallinas_asignadas,
        cantidad: this.Lot.recibidas
      });
      
      this.business$.subscribe(b =>{
        let empresa = b.filter(x => x.nombre_comercial === this.Lot.business)[0]
        this.loteForm.patchValue({
          empresa: empresa.id
        });
        console.log(this.loteForm);
      });
    }
  }

  setDate(value){
    let date = new Date(value);
    this.loteForm.patchValue({
      month: date.getMonth()+1,
      year: date.getFullYear(),
      fecha_entrada: date
    })
  }

  setBusiness(value){
    const empresa = JSON.parse(value) as BusinessInterface
    this.loteForm.patchValue({
      empresa: empresa.id,
      cant_gallinas_asignadas: empresa.cant_gallinas_asignadas
    });
  }

  get(value){
    return this.loteForm.get(value);
  }

  async post(){
    this.cantidad = {
      hembras: this.loteForm.get('cantidad').value,
      machos: this.loteForm.get('cantidad').value * 0.15,
    }
    this.loteForm.patchValue({
      cantidad: {...this.cantidad}
    });
    let lote = this.loteForm.value as LotResponse;
    lote.seccion = (lote.seccion as string).toUpperCase();
    let load = await this.loadCtrl.create();
    await load.present();
    this.apiService.postLot(this.loteForm.value).subscribe(resp =>{
      load.dismiss();
      this.store.dispatch(LotsActions.GET_LOTS());
      this.router.navigate(['../../']);
    }, error => load.dismiss())
  }

  async put(){
    this.cantidad = {
      hembras: this.loteForm.get('cantidad').value,
      machos: this.loteForm.get('cantidad').value * 0.15,
    }
    this.loteForm.patchValue({
      cantidad: {...this.cantidad}
    });
    let load = await this.loadCtrl.create();
    await load.present();
    this.apiService.updateLot(this.id, this.loteForm.value).subscribe(resp =>{
      load.dismiss();
      this.store.dispatch(LotsActions.GET_LOTS());
      this.dismiss();
    }, error => load.dismiss());
  }

  async dismiss(){
    this.loteForm.reset();
    this.edit = false;
    await this.modalCtrl.dismiss();
  }
}
