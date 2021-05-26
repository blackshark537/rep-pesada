import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  cols$;
  lots  = [];
  state = {
    owner:   null,
    phone:   null,
    address: null,
    status:  null
  }
  production;

  constructor(
    public lotSerivce: LotService,   //Inject the lot service class
    private activatedRoute: ActivatedRoute
  ) { }
/////////////////////////////////////////////////////////////////////////////////////////////////////
  async ngOnInit() {
    this.production = this.activatedRoute.snapshot.paramMap.get('production');
    this.cols$ = this.production === 'true'? this.lotSerivce.colsProduction$ : this.lotSerivce.colsRecria$;
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
