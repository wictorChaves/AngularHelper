import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMedicineComponent } from './create-medicine.component';

describe('CreateMedicineComponent', () => {
  let component: CreateMedicineComponent;
  let fixture: ComponentFixture<CreateMedicineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMedicineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
