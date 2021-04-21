import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { LotService } from '../services/lot/lot.service';

@Component({
  selector: 'app-breeder',
  templateUrl: './breeder.page.html',
  styleUrls: ['./breeder.page.scss'],
})
export class BreederPage implements OnInit, OnDestroy {

  sub$: Subscription;

  cols$ = this.lotSerivce.colsRecria$;
  lots=[];

  state={
    owner: null,
    phone: null,
    address: null,
    status: null
  }

  constructor(
    public lotSerivce: LotService,
  ) { }

  async ngOnInit() {
    
    this.sub$ = this.lotSerivce.lot$.pipe(take(1)).subscribe(lote=>{
      
      if(lote==null) return;
      
      this.state = {
        owner:lote.business,
        phone: lote.phone,
        address: lote.address,
        status: 'breeding'
      };

      if(lote.week >20){
        this.lots=lote.produccion;
        this.state.status = lote.status;
        return;
      }
      this.lots=lote.recria;
    });
  }

  ngOnDestroy(){
    this.sub$.unsubscribe();
  }
}
