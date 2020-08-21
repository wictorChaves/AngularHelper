import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDoctorScheduleComponent } from './list-doctor-schedule.component';

describe('ListDoctorScheduleComponent', () => {
  let component: ListDoctorScheduleComponent;
  let fixture: ComponentFixture<ListDoctorScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDoctorScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDoctorScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
