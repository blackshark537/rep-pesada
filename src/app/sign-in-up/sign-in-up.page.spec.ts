import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppModule } from '../app.module';

import { SignInUpPage } from './sign-in-up.page';

describe('SignInUpPage', () => {
  let component: SignInUpPage;
  let fixture: ComponentFixture<SignInUpPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInUpPage ],
      imports: [
        AppModule
      ],
      providers:[FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(SignInUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
