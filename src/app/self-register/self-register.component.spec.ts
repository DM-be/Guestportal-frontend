import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfRegisterComponent } from './self-register.component';

describe('SelfRegisterComponent', () => {
  let component: SelfRegisterComponent;
  let fixture: ComponentFixture<SelfRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
