import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoctorScheduleComponent } from './edit-doctor-schedule.component';

describe('EditDoctorScheduleComponent', () => {
  let component: EditDoctorScheduleComponent;
  let fixture: ComponentFixture<EditDoctorScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDoctorScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDoctorScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
