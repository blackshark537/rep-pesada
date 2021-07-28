import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyProdProjectionPage } from './daily-prod-projection.page';

describe('DailyProdProjectionPage', () => {
  let component: DailyProdProjectionPage;
  let fixture: ComponentFixture<DailyProdProjectionPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyProdProjectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyProdProjectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

});
