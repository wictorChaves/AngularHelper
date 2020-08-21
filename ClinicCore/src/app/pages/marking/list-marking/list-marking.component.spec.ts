import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMarkingComponent } from './list-marking.component';

describe('ListMarkingComponent', () => {
  let component: ListMarkingComponent;
  let fixture: ComponentFixture<ListMarkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMarkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMarkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
