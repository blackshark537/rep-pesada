import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { LotService } from '../services/lot/lot.service';

@Component({
  selector: 'app-breeder',
  templateUrl: './breeder.page.html',
  styleUrls: ['./breeder.page.scss'],
})
export class BreederPage implements OnInit {

  cols$ = this.lotSerivce.colsRecria$;
  lots=[];
  constructor(
    public lotSerivce: LotService
  ) { }

  ngOnInit() {
    this.lotSerivce.lot$.pipe(take(1)).subscribe(lote=>{
      if(lote==null) return;
      if(lote.week >20){
        const re=this.lotSerivce.getRecria(lote);
        this.lots=this.lotSerivce.getProd(re[re.length-1]);
        return;
      }
      this.lots=this.lotSerivce.getRecria(lote);
    });
  }

}
