import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReceptionistsComponent } from './list-receptionists.component';

describe('ListReceptionistsComponent', () => {
  let component: ListReceptionistsComponent;
  let fixture: ComponentFixture<ListReceptionistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReceptionistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReceptionistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
