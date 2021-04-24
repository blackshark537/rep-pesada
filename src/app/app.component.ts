import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppModel } from './models/AppModel';
import { businessActions, capacitiesActions, LotsActions, producersActions } from './actions';
import { AuthGuard } from './guards';
import { AuthService } from './services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public appPages = [
    { title: 'Productores',            url: '/producers',      icon: 'person' },
    { title: 'Capacidades Instaladas', url: '/capacity',       icon: 'file-tray' },
    //{ title: 'Inventarios',            url: '/inventory/1',    icon: 'clipboard' },
    { title: 'Lotes en recria',        url: '/lot/breeding',   icon: 'cube' },
    { title: 'Lotes en producción',    url: '/lot/production', icon: 'cube' },
    { title: 'Producción',             url: '/production',     icon: 'cube' },
    { title: 'Empresas',               url: '/business',       icon: 'business' }
  ];
  public labels     = ['Automatico', 'Manual', 'Normal', 'Controlado'];
  public colors     = ['warning', 'secondary', 'tertiary', 'success', 'primary', 'danger']
  public canActive  = false; //can navigate throw menu
  constructor(
    public authService: AuthService,
    private store: Store<AppModel>,
    private router: Router
  ) {
    authService.user$.subscribe(val =>{
      if(!!val){
         this.router.navigate(['/producers']);
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
