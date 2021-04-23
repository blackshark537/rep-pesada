import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppModel } from './models/AppModel';
import { LotsActions } from './actions';
import { AuthGuard } from './guards';
import { AuthService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public appPages = [
    { title: 'Productores', url: '/user', icon: 'person' },
    { title: 'Capacidades Instaladas', url: '/capacity', icon: 'file-tray' },
    { title: 'Inventarios', url: '/inventory/1', icon: 'clipboard' },
    { title: 'Lotes en recria', url: '/lot/breeding', icon: 'cube' },
    { title: 'Lotes en producción', url: '/lot/production', icon: 'cube' },
    { title: 'Producción', url: '/production', icon: 'cube' },
    { title: 'Empresas', url: '/business', icon: 'business' },
    //{ title: 'Production', url: '/folder/production', icon: 'bar-chart' },
  ];
  public labels     = ['Automatico', 'Manual', 'Normal', 'Controlado'];
  public colors     = ['warning', 'secondary', 'tertiary', 'success', 'primary', 'danger']
  public canActive  = false;
  constructor(
    guard: AuthGuard,
    public authService: AuthService,
    private store: Store<AppModel>
  ) {
    guard.canActivate().subscribe(val =>{
      this.canActive = val;
    });
  }

  ngOnInit(){
    if(false){
      this.store.dispatch(LotsActions.GET_LOTS());
      setInterval(()=>{
        this.store.dispatch(LotsActions.GET_LOTS());
      }, 10*60*1000);
    }
  }
}
