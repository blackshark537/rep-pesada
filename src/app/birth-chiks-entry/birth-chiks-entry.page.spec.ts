import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BirthChiksEntryPage } from './birth-chiks-entry.page';

describe('BirthChiksEntryPage', () => {
  let component: BirthChiksEntryPage;
  let fixture: ComponentFixture<BirthChiksEntryPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthChiksEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BirthChiksEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

});
