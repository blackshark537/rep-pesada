import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonthBarEggsIndustryComponent } from './month-bar-eggs-industry.component';

describe('MonthBarEggsIndustryComponent', () => {
  let component: MonthBarEggsIndustryComponent;
  let fixture: ComponentFixture<MonthBarEggsIndustryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthBarEggsIndustryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonthBarEggsIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

});
