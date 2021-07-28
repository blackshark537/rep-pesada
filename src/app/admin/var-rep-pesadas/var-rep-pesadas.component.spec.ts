import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AdminPageModule } from '../admin.module';

import { VarRepPesadasComponent } from './var-rep-pesadas.component';

describe('VarRepPesadasComponent', () => {
  let component: VarRepPesadasComponent;
  let fixture: ComponentFixture<VarRepPesadasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VarRepPesadasComponent ],
      imports: [AdminPageModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VarRepPesadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  
});
