import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppModel, EggLotInterface } from '../models';
import { BrowserService } from '../services';

@Component({
  selector: 'app-birth-chiks-entry',
  templateUrl: './birth-chiks-entry.page.html',
  styleUrls: ['./birth-chiks-entry.page.scss'],
})
export class BirthChiksEntryPage implements OnInit {

  year = new Date().getFullYear();
  sub$: Subscription;
  forms: EggLotInterface[]=[];

  constructor(
    private store: Store<AppModel>,
    private loading: LoadingController,
    private browser: BrowserService
  ) { }

  async ngOnInit() {
    let load = await this.loading.create({
      message: 'Cargando proyecciones<br> porfavor espere....'
    });
    await load.present();

    this.sub$ = this.store.select('eggLots').pipe(
      map(pro => pro.filter(p => p.year === this.year))
    ).subscribe(resp => {
      this.forms=[...resp];
      load.dismiss();
    });
  }

  async confirm(){
    let resp  = await this.browser.Confirm('¿Está usted seguro que quiere guardar los cambios?', "Guardar");
    if(resp){
      console.log('got  it');
    }
  }

}
