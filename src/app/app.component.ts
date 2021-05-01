import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppModel } from './models/AppModel';
import { businessActions, capacitiesActions, LotsActions, producersActions } from './actions';
import { AuthService } from './services';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public appPages = [
    { title: 'Empresas',                  url: '/business',         icon: 'business' },
    { title: 'Producción',                url: '/production',       icon: 'cube' },
    { title: 'Asignación vs Importación', url: '/data-driven',      icon: 'clipboard' },
    { title: 'Calendario de Entrada',     url: '/monthly-data',     icon: 'file-tray' },
    { title: 'Proyección diaria de pollitas',         url: '/daily-projection', icon: 'calendar' },
    { title: 'Lotes en recria',           url: '/lot/breeding',     icon: 'cube' },
    { title: 'Lotes en producción',       url: '/lot/production',   icon: 'cube' },
    { title: 'Capacidad Instalada',       url: '/capacity',         icon: 'clipboard' },
  ];
  public labels     = ['Automatico', 'Manual', 'Normal', 'Controlado'];
  public colors     = ['warning', 'secondary', 'tertiary', 'success', 'primary', 'danger']
  public canActive  = false; //can navigate throw menu
  constructor(
    public authService: AuthService,
    private store: Store<AppModel>,
  ) {
    new BehaviorSubject(localStorage.getItem('token')).subscribe(val =>{
      if(!!val){
         this.store.dispatch(LotsActions.GET_LOTS());
         this.store.dispatch(producersActions.GET_PRODUCERS());
         this.store.dispatch(capacitiesActions.GET_CAPACITIES());
         this.store.dispatch(businessActions.GET_BUSINESSES());
      }
      this.canActive = !!val;
    });
  }

  ngOnInit(){
      /* setInterval(()=>{
        this.store.dispatch(LotsActions.GET_LOTS());
      }, 10*60*1000); */
  }
}
