import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarMonthlyLightbreederComponent } from './bar-monthly-lightbreeder.component';

describe('BarMonthlyLightbreederComponent', () => {
  let component: BarMonthlyLightbreederComponent;
  let fixture: ComponentFixture<BarMonthlyLightbreederComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BarMonthlyLightbreederComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarMonthlyLightbreederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

});
