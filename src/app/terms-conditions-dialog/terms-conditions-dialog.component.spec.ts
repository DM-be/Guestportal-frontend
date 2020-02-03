import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionsDialogComponent } from './terms-conditions-dialog.component';

describe('TermsConditionsDialogComponent', () => {
  let component: TermsConditionsDialogComponent;
  let fixture: ComponentFixture<TermsConditionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsConditionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsConditionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
