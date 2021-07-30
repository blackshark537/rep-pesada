import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit {

  @Input('back')  back=false;
  @Input('button-color') buttonColor='warning';
  text='Atrás';
  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }

  goMenu(){
      this.router.navigate(['/menu']);
  }


}

