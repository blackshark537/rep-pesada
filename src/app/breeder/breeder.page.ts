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

      const element: any = document.getElementsByClassName("datatable-body-row").item(0);
      if (element) {
        element.focus();
      }
      console.log(lote)
      this.state = {
        owner:   lote.business,
        phone:   lote.phone,
        address: lote.address,
        status:  'breeding'
      };
      lote.projections.forEach((p, i)=>{
        this.lots.push({
          ...p,
          id: i+1
        })
      })
    });
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnDestroy(){
    this.sub$.unsubscribe();                      //Unsubscribe from lots Observable
  }
}
