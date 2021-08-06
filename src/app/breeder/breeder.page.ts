import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppModel } from '../models';
import { LotService } from '../services';

@Component({
  selector: 'app-breeder',
  templateUrl: './breeder.page.html',
  styleUrls: ['./breeder.page.scss'],
})
export class BreederPage implements OnInit, OnDestroy {

  sub$: Subscription;
  title='Analisis Predictivo Rep. Abuelas'
  cols$;
  lots  = [];
  state = {
    owner:   null,
    phone:   null,
    address: null,
    status:  null
  }
  production;
  estado='recria';

  constructor(
    public lotSerivce: LotService,   //Inject the lot service class
    private activatedRoute: ActivatedRoute,
    private store: Store<AppModel>
  ) { }
/////////////////////////////////////////////////////////////////////////////////////////////////////
  async ngOnInit() {
    this.lots=[];
    this.state = {
      owner:   null,
      phone:   null,
      address: null,
      status:  null
    }
    this.production = this.activatedRoute.snapshot.paramMap.get('production');
    
    if(this.production === 'true') this.title='Analisis Predictivo Rep. Pesadas';

    this.cols$ = this.production === 'true'? this.lotSerivce.colsProduction$ : this.lotSerivce.colsRecria$;
    this.sub$ = this.lotSerivce.lot$.pipe(take(1)).subscribe(lote=>{
      
      if(lote==null){
        //console.log("The lot is undefined or null  : %s", lote);
        window.history.back();
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
        status:  lote?.status
      };
      /*  */

      if(this.production==='true'){
        /* this.store.select('eggsProjections').pipe(map(prj => prj.filter(p => p.id ===  lote.id))).subscribe(resp=>{
          resp.filter(p=> p.estado===this.estado).forEach((p, i)=>{
            this.lots.push({
              ...p,
              id: i+1
            })
          });
        }); */
        lote.projections.filter(p=> p.estado===this.estado).forEach((p, i)=>{
          this.lots.push({
            ...p,
            id: i+1
          })
        });
      }else{
        this.store.select('projections').pipe(map(prj => prj.filter(p => p.id ===  lote.id))).subscribe(resp=>{
          resp.filter(p=> p.estado===this.estado).forEach((p, i)=>{
            this.lots.push({
              ...p,
              id: i+1
            })
          });
        });
      }

    });
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnDestroy(){
    this.sub$.unsubscribe();                      //Unsubscribe from lots Observable
  }

  getType(){
    if(!this.state.owner){
      return '';
    }else{
      return this.state.owner.includes('Pollo Cibao (Corp. Avicola del Caribe)')? 'ROSS' : 'COBB'
    }
  }

  filterBy(value){
    this.estado=value;
    this.ngOnInit();
  }
}
