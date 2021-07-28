import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LotFormPage } from './lot-form.page';

describe('LotFormPage', () => {
  let component: LotFormPage;
  let fixture: ComponentFixture<LotFormPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LotFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LotFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

});
