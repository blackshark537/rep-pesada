import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { LotService } from '../services/lot/lot.service';

@Component({
  selector: 'app-breeder',
  templateUrl: './breeder.page.html',
  styleUrls: ['./breeder.page.scss'],
})
export class BreederPage implements OnInit {

  maxWeeks: number=67;
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
    
    this.lotSerivce.lot$.pipe(take(1)).subscribe(lote=>{
      if(lote==null) return;
      
      this.state = {
        owner:lote.business,
        phone: lote.phone,
        address: lote.address,
        status: 'breeding'
      };
      
      if(lote.week >20){
        const re=this.lotSerivce.getRecria(lote);
        this.lots=this.lotSerivce.getProd(re[re.length-1]);
        this.state.status = 'production';
        return;
      }
      this.lots=this.lotSerivce.getRecria(lote);
    });
  }

}
