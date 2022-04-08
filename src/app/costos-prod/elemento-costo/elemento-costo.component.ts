import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-elemento-costo',
  templateUrl: './elemento-costo.component.html',
  styleUrls: ['./elemento-costo.component.scss'],
})
export class ElementoCostoComponent implements OnInit {
  
  pTitle = 'Elemento De Costo';

  constructor() { }

  ngOnInit() {}

  get dateNow(): Date{
    return new Date();
  }
}
