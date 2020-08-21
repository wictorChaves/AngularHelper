import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReceptionistsComponent } from './create-receptionists.component';

describe('CreateReceptionistsComponent', () => {
  let component: CreateReceptionistsComponent;
  let fixture: ComponentFixture<CreateReceptionistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateReceptionistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReceptionistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
