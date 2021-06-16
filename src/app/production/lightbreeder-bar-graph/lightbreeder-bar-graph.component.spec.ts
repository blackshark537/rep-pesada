import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LightbreederBarGraphComponent } from './lightbreeder-bar-graph.component';

describe('LightbreederBarGraphComponent', () => {
  let component: LightbreederBarGraphComponent;
  let fixture: ComponentFixture<LightbreederBarGraphComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LightbreederBarGraphComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LightbreederBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
