import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPatientMarkingComponent } from './list-patient-marking.component';

describe('ListPatientMarkingComponent', () => {
  let component: ListPatientMarkingComponent;
  let fixture: ComponentFixture<ListPatientMarkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPatientMarkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPatientMarkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
