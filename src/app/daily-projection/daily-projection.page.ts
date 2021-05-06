import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { AppModel, LotResponse } from '../models';

@Component({
  selector: 'app-daily-projection',
  templateUrl: './daily-projection.page.html',
  styleUrls: ['./daily-projection.page.scss'],
})
export class DailyProjectionPage implements OnInit {
  table=true;
  year = new BehaviorSubject(2018);
  actual_year = new BehaviorSubject(new Date().getFullYear());
  rows=[];
  cols=[
    /* {prop: 'empresa', header: 'Nombre Comercial'},
    {prop: 'entrydate', header:'Fecha de Entrada'},*/
    {prop: 'day', header: 'Dia'}, 
    {prop: 'jan', header: 'Enero'},
    {prop: 'feb', header: 'Febrero'},
    {prop: 'mar', header: 'Marzo'},
    {prop: 'apr', header: 'Abril'},
    {prop: 'may', header: 'Mayo'},
    {prop: 'jun', header: 'Junio'},
    {prop: 'jul', header: 'Julio'},
    {prop: 'ago', header: 'Agosto'},
    {prop: 'sep', header: 'Septiembre'},
    {prop: 'oct', header: 'Octubre'},
    {prop: 'nov', header: 'Noviembre'},
    {prop: 'dec', header: 'Diciembre'},
  ];
  constructor(
    private store: Store<AppModel>
  ) { }

  ngOnInit() {
    this.year.pipe(
      switchMap(year => this.store.select('lots').pipe(
        map(actions => actions.filter(x => x.entry.getFullYear() >= year) as LotResponse[])
      ))
    ).subscribe(lots =>{
      let jan = new Array(31).fill(0)
      let feb = new Array(31).fill(0)
      let mar = new Array(31).fill(0)
      let apr = new Array(31).fill(0)
      let may = new Array(31).fill(0)
      let jun = new Array(31).fill(0)
      let jul = new Array(31).fill(0)
      let ago = new Array(31).fill(0)
      let sep = new Array(31).fill(0)
      let oct = new Array(31).fill(0)
      let nov = new Array(31).fill(0)
      let dec = new Array(31).fill(0)

      lots.forEach(lot => {
        lot.proyeccions.forEach(prod =>{
          if(prod.day <=31) jan[prod.day]+= parseInt(prod.numero_de_aves);
          if(prod.day >= 31 && prod.day <=59) feb[prod.day-31]+= parseInt(prod.numero_de_aves);
          if(prod.day >= 61 && prod.day <= 92) mar[prod.day-61]+= parseInt(prod.numero_de_aves);
          if(prod.day >= 92 && prod.day <= 122) apr[prod.day-92]+= parseInt(prod.numero_de_aves);
          if(prod.day >= 122 && prod.day <= 153) may[prod.day-122]+= parseInt(prod.numero_de_aves);
          if(prod.day >= 153 && prod.day <= 183) jun[prod.day-153]+= parseInt(prod.numero_de_aves);
          if(prod.day >= 183 && prod.day <= 214) jul[prod.day-183]+= parseInt(prod.numero_de_aves);
          if(prod.day >= 214 && prod.day <= 245) ago[prod.day-214]+= parseInt(prod.numero_de_aves);
          if(prod.day >= 245 && prod.day <= 275) sep[prod.day-245]+= parseInt(prod.numero_de_aves);
          if(prod.day >= 275 && prod.day <= 306) oct[prod.day-275]+= parseInt(prod.numero_de_aves);
          if(prod.day >= 306 && prod.day <= 336) nov[prod.day-306]+= parseInt(prod.numero_de_aves);
          if(prod.day >= 336 && prod.day <= 366) dec[prod.day-336]+= parseInt(prod.numero_de_aves);
        });
      });

      this.rows=[];
      for (let i = 0; i <= 30; i++) {
        this.rows.push({
          id: i,
          day: i+1,
          jan: jan[i],
          feb: feb[i],
          mar: mar[i],
          apr: apr[i],
          may: may[i],
          jun: jun[i],
          jul: jul[i],
          ago: ago[i],
          sep: sep[i],
          oct: oct[i],
          nov: nov[i],
          dec: dec[i]
        })
      }
    });
  }

  selected(event){}
  
  setYear(value){
    this.year.next(new Date(value).getFullYear());
  }
}
