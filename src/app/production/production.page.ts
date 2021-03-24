import { Component, OnInit } from '@angular/core';
import { LotService } from '../services/lot/lot.service';
import { last } from 'rxjs/operators'

@Component({
  selector: 'app-production',
  templateUrl: './production.page.html',
  styleUrls: ['./production.page.scss'],
})
export class ProductionPage implements OnInit {

  LotNumber = null;
  res = []
  res2 = [
    {
      name: 'Temp Celcius',
      value: 33
    },
    {
      name: 'Hum %',
      value: 80
    },
    {
      name: 'Lux Hora',
      value: 30
    }
  ]

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;
  viewCard: any[] = [400, 300];
  viewPie: any[] = [500, 300];
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#232837';


  viewArea: any[] = [700, 400];
  legend: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Week';
  yAxisLabel: string = 'Production';
  timeline: boolean = true;

  resMulti = [
    {
      name: 'Lot 121 real',
      series:[
        {
          name: '21',
          value: 300
        },
        {
          name: '22',
          value: 500
        },
        {
          name: '23',
          value: 350
        }
      ]
    },
    {
      name: 'Lot 121 projected',
      series:[
        {
          name: '21',
          value: 340
        },
        {
          name: '22',
          value: 600
        },
        {
          name: '23',
          value: 390
        }
      ]
    }
  ]

  constructor(
    public lotService: LotService
  ) { }

  ngOnInit() {
    const result = this.lotService.lot$.getValue();
    this.LotNumber = result.lot;
    this.res.push({name: 'Total Chicks', value: result.total});
    this.res.push({name: 'Days in farm', value: result.days});
    this.res.push({name: 'Week', value: result.week});
  }

}
