import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsMarkingComponent } from './statistics-marking.component';

describe('StatisticsMarkingComponent', () => {
  let component: StatisticsMarkingComponent;
  let fixture: ComponentFixture<StatisticsMarkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsMarkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsMarkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
