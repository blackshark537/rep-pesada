import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductionInterface } from '../models';
import { ApiService } from '../services';
import { addDays, addWeeks, differenceInDays } from 'date-fns'

@Component({
  selector: 'app-detail-lot',
  templateUrl: './detail-lot.page.html',
  styleUrls: ['./detail-lot.page.scss'],
})
export class DetailLotPage implements OnInit {

  title='CONTROL DE REGISTRO DIARIO DE PRODUCCION';
  lotId=null;
  week=null;
  edit=false;
  data$: Observable<ProductionInterface[]>
  final_day = null;
  totalValues = null;
  fecha_inicio = null;
  fecha_final = null;
  today_date = new Date();
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.lotId = parseInt(this.activatedRoute.snapshot.paramMap.get('lotId'));
    this.week = parseInt(this.activatedRoute.snapshot.paramMap.get('week'));
    const date = new Date(this.activatedRoute.snapshot.paramMap.get('fecha'));
    this.fecha_inicio = addWeeks(date, this.week-1);
    this.fecha_final = addDays(this.fecha_inicio, 6);

    this.data$ = this.apiService.get_daily_productions(this.lotId, this.week).pipe(
      map(actions => {
        this.final_day = actions[actions.length-1]?.final_dia;
        this.totalValues = actions.length;
        return actions;
      })
    );
  }

  nextWeek(){
    this.router.navigate([`fecha/12-2-21/detail-lot/${this.lotId}/week/${this.week+1}`]);
  }

  newOne(){
    if(this.totalValues <= 7){
      if(this.final_day){
        this.router.navigate([`/forms/daily-prod/lot/${this.lotId}/week/${this.week}/day-init/${this.final_day}`]);
      } else {
        this.router.navigate([`/forms/daily-prod/lot/${this.lotId}/week/${this.week}`]);
      }  
    } else {
      this.router.navigate([`/forms/daily-prod/lot/${this.lotId}/week/${this.week+1}`]);
    }
  }

  get life_time(){
    return differenceInDays(this.today_date, this.fecha_inicio);
  }

  getTotalEggs(d: ProductionInterface){
    return parseInt(d.huevos_incubables) + parseInt(d.huevos_comerciables) + parseInt(d.huevos_dobles) +
    parseInt(d.huevos_rotos) + parseInt(d.huevos_sucios);
  }
}
