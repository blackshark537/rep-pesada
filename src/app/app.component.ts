import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppModel } from './models/AppModel';
import { LotsActions } from './actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public appPages = [
    { title: 'Producers', url: '/user', icon: 'person' },
    { title: 'Installed Capacities', url: '/capacity', icon: 'file-tray' },
    { title: 'Inventory', url: '/inventory/1', icon: 'clipboard' },
    { title: 'Lots Breeding', url: '/lot/breeding', icon: 'cube' },
    { title: 'Lots Production', url: '/lot/production', icon: 'cube' },
    { title: 'Production', url: '/production', icon: 'cube' },
    { title: 'Businesses', url: '/business', icon: 'business' },
    //{ title: 'Production', url: '/folder/production', icon: 'bar-chart' },
  ];
  public labels = ['Automatic', 'Manual', 'Normal', 'Controlado'];
  constructor(
    private store: Store<AppModel>
  ) {}

  ngOnInit(){
    this.store.dispatch(LotsActions.GET_LOTS());
    setInterval(()=>{
      this.store.dispatch(LotsActions.GET_LOTS());
    }, 10*60*1000);
  }
}
