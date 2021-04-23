import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { LotService } from '../services';

@Component({
  selector: 'app-breeder',
  templateUrl: './breeder.page.html',
  styleUrls: ['./breeder.page.scss'],
})
export class BreederPage implements OnInit, OnDestroy {

  sub$: Subscription;

  cols$ = this.lotSerivce.colsRecria$;
  lots  = [];
  state = {
    owner:   null,
    phone:   null,
    address: null,
    status:  null
  }

  constructor(
    public lotSerivce: LotService,   //Inject the lot service class
  ) { }
/////////////////////////////////////////////////////////////////////////////////////////////////////
  async ngOnInit() {
    
    this.sub$ = this.lotSerivce.lot$.pipe(take(1)).subscribe(lote=>{
      
      if(lote==null){
        console.log("The lot is undefined or null  : %s", lote);
        return;
      }
      
      this.state = {
        owner:   lote.business,
        phone:   lote.phone,
        address: lote.address,
        status:  'breeding'
      };

      if(lote.week >20){                           // if the lot of chicks is
        this.lots           =   lote.produccion;  // more than 20 weeks old its in production
        this.state.status   =   lote.status;      //asign status
        console.log("Chicks are in : %s", lote.status);
        return;
      }
      this.lots             =   lote.recria;     //read lote.recria instead
    });
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnDestroy(){
    this.sub$.unsubscribe();                      //Unsubscribe from lots Observable
  }
}
