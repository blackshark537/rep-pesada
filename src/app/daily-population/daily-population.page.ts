import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services';

@Component({
  selector: 'app-daily-population',
  templateUrl: './daily-population.page.html',
  styleUrls: ['./daily-population.page.scss'],
})
export class DailyPopulationPage implements OnInit {

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {

  }

}
