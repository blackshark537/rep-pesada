import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Producers', url: '/user', icon: 'person' },
    { title: 'Installed Capacities', url: '/capacity', icon: 'file-tray' },
    { title: 'Inventory', url: '/inventory/1', icon: 'clipboard' },
    { title: 'Production', url: '/lot', icon: 'cube' },
    { title: 'Businesses', url: '/business', icon: 'business' },
    //{ title: 'Production', url: '/folder/production', icon: 'bar-chart' },
  ];
  public labels = ['Automatic', 'Manual', 'Normal', 'Controlado'];
  constructor() {}
}
