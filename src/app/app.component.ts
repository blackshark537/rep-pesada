import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Lots', url: '/lot', icon: 'cube' },
    { title: 'Businesses', url: '/business', icon: 'business' },
    { title: 'Capacities', url: '/capacity', icon: 'file-tray' },
    { title: 'Users', url: '/user', icon: 'person' },
    //{ title: 'Inventory', url: '/inventory', icon: 'clipboard' },
    //{ title: 'Production', url: '/folder/production', icon: 'bar-chart' },
  ];
  public labels = ['Automatic', 'Manual', 'Normal', 'Controlado'];
  constructor() {}
}
