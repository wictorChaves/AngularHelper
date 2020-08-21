import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPatientProfileComponent } from './list-patient-profile.component';

describe('ListPatientProfileComponent', () => {
  let component: ListPatientProfileComponent;
  let fixture: ComponentFixture<ListPatientProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPatientProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPatientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
