import { ComponentFixture, getTestBed, TestBed, waitForAsync } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { BackButtonComponent } from './back-button.component';

describe('BackButtonComponent', () => {
  let component: BackButtonComponent;
  let fixture: ComponentFixture<BackButtonComponent>;
  let compiled;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BackButtonComponent ],
      imports: [AppModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BackButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  }));

  const getByTestId = (testId: string, compiled) => {
    return compiled.querySelector(`[data-test-id="${testId}"]`);
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ion-back-button should be falsy',async()=>{
    await fixture.whenStable();
    let el =  getByTestId('back-button', compiled);
    expect(el).toBeFalsy();
  })

  it('menu-button should be truthy',async()=>{
    await fixture.whenStable();
    let el = <HTMLElement>getByTestId('menu-button', compiled);
    expect(el).toBeTruthy();
  })
});
