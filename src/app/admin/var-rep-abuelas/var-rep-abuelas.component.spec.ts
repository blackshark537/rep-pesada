import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VarRepAbuelasComponent } from './var-rep-abuelas.component';

describe('VarRepAbuelasComponent', () => {
  let component: VarRepAbuelasComponent;
  let fixture: ComponentFixture<VarRepAbuelasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VarRepAbuelasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VarRepAbuelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
