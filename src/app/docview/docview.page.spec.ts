import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocviewPage } from './docview.page';

describe('DocviewPage', () => {
  let component: DocviewPage;
  let fixture: ComponentFixture<DocviewPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DocviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

});
