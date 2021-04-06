import { Component, OnInit } from '@angular/core';
import { LotService } from '../services/lot/lot.service';
import { last } from 'rxjs/operators'
import { AlertController, ModalController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-production',
  templateUrl: './production.page.html',
  styleUrls: ['./production.page.scss'],
})
export class ProductionPage implements OnInit {

  Moratlity=5;
  LotNumber = null;
  res = []
  res2 = []

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;
  viewCard: number[] = [900, 300];
  viewPie: number[] = [400, 400];
  colorScheme = {
    domain: ['#99D9F2', '#F2E205', '#F2B705', '#D93D04', '#D98E04', '#aae3f5']
  };
  cardColor: string = '#232837';

  //domain: ['#023859', '#038C8C', '#F2811D', '#F26716', '#BF1515', '#D98E04'],

  activateCard: boolean = false;
  activateArea: boolean = false;
  activatePie: boolean = false;

  viewArea: number[] = [600, 400];
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
      name: 'Lot 121 Real',
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
      name: 'Lot 121 Projected',
      series:[
        {
          name: '21',
          value: 290
        },
        {
          name: '22',
          value: 400
        },
        {
          name: '23',
          value: 390
        }
      ]
    }
  ]

  constructor(
    public lotService: LotService,
    private modalCrtl: AlertController
  ) { }

  ngOnInit() {
    this.lotService.lot$.subscribe(result =>{
      if(result === null) return;
      this.LotNumber = result.lot;
      const mort = 100-1*(this.Moratlity/result.week)
      const date = result.date.split('-');
      this.res.push({name: 'Entry chicks', value: result.total.toString() + ' Chicks'});
      this.res.push({name: 'Acc. Mortality', value: (100-mort).toString().slice(0,4) +'%'});
      this.res.push({name: 'Current chicks', value: (Math.round(result.total - (result.total*((100-mort)*0.01)))).toString() + ' Chicks ±0.5' });
      this.res.push({name: 'Entry Date', value: `${date[2]}-${date[1]}-${date[0]}`})
      this.res.push({name: 'Age in Days', value: result.days + ' days'});
      this.res.push({name: 'Age in Weeks', value: result.week + ' weeks'});

      this.res2.push({name: 'Current Female Chicks', value: result.females-(result.females * ((100-mort)*0.01)) });
      this.res2.push({name: 'Current Male Chicks', value: result.males-(result.males * ((100-mort)*0.01)) });
    
      setTimeout(() => {
        this.activateCard=true;
        this.activatePie=true;
      },100);

    });
    

    setTimeout(() => {
      this.activateArea=true;
    },100);
  }

  async setMortality(){
    const modal = await this.modalCrtl.create({
      header:'Mortality',
      subHeader:'Set Mortality  %',
      inputs:[
        {
          type:'number',
          placeholder: 'Mortality',
          value: this.Moratlity,
        }
      ],
      buttons:[{
        text: 'Cancel',
        role: 'cancel'
      },{
        text: 'Accept',
        handler:  async (evt)=>{
          if(evt){
            this.Moratlity=parseInt(evt[0]);
            console.log(this.Moratlity);
            this.res=[];
            this.res2=[];
            this.activateCard=false;
            this.activatePie=false;
            this.ngOnInit();
          }
        }
      }]
    });

    await modal.present();
    
  }

}
