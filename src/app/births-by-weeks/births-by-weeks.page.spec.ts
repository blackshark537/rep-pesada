import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BirthsByWeeksPage } from './births-by-weeks.page';

describe('BirthsByWeeksPage', () => {
  let component: BirthsByWeeksPage;
  let fixture: ComponentFixture<BirthsByWeeksPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthsByWeeksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BirthsByWeeksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

});
