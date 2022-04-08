import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppModel } from './models/AppModel';
import { businessActions, capacitiesActions, LotsActions, eggLotsActions } from './actions';
import { AuthService } from './services';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public canActive = false; 

  constructor(
    public authService: AuthService,
    private store: Store<AppModel>,
  ) { }

  async ngOnInit() {
    document.body.classList.toggle('dark');
    new BehaviorSubject(localStorage.getItem('token')).subscribe(async val => {
      if (!!val) {
        this.store.dispatch(businessActions.GET_BUSINESSES());
        this.store.dispatch(LotsActions.GET_LOTS());
      }
      this.canActive = !!val;
    });
  }
}
