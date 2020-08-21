import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReceptionistsComponent } from './edit-receptionists.component';

describe('EditReceptionistsComponent', () => {
  let component: EditReceptionistsComponent;
  let fixture: ComponentFixture<EditReceptionistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReceptionistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReceptionistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
