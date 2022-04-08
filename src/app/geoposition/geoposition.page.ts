import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppModel, positions } from '../models';

enum BusinessType{
  Abuelas = 'abuelas',
  Reprod  = 'reproductoras'
}

@Component({
  selector: 'app-geoposition',
  templateUrl: './geoposition.page.html',
  styleUrls: ['./geoposition.page.scss'],
})
export class GeopositionPage implements OnInit, OnDestroy {

  businessType='abuelas';
  title = '';
  positions: positions[] = [];
  geos = [];
  maps = false;
  sub$: Subscription;

  constructor(
    private store: Store<AppModel>,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.businessType = this.activatedRoute.snapshot.paramMap.get('businessType');

    if(this.businessType === BusinessType.Abuelas){
      this.title = 'Geoposición de las Empresas con Progenitores Abuelos';
      this.sub$ = this.store.select('lots').subscribe(lots=>{
        lots.forEach(b=>{
          const pos = b.RNC.split(',');
          const lat = pos[0];
          const lon = pos[1];
          const data = lots.filter(lot => lot.business === b.business && lot.status === 'production' && lot.week <= 69);
          const dataRecria = lots.filter(lot => lot.business === b.business && lot.status === 'breeding' && lot.week <= 69);
          this.positions.push({
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            accuracy: 99,
            empresa: b.business,
            asignacion: b.cant_gallinas_asignadas,
            importadas: data.map(lot=> lot.females).reduce((p,c)=>p+=c, 0),
            recria: dataRecria.map(lot=> lot.total).reduce((p,c)=>p+=c, 0),
            poblacion: data.map(lot=> lot.total).reduce((p,c)=>p+=c, 0),
            h_incubables: data.map(lot=> lot.incubables).reduce((p,c)=>p+=c, 0),
            h_totales: data.map(lot=> lot.production).reduce((p,c)=>p+=c, 0),
            nacimientos: data.map(lot=> lot.nacimientos).reduce((p,c)=>p+=c, 0),
          })
        });

        setTimeout(()=> this.maps = true, 200);
      });
      
    } else {
      this.title = 'Geoposición de las Empresas con Reproductoras Pesadas';
      this.positions = [];
      this.maps=true;
    }
  }

  ngOnDestroy(): void {
    if(this.businessType === BusinessType.Abuelas) this.sub$.unsubscribe();
  }

}
