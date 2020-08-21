import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogMarkingComponent } from './log-marking.component';

describe('LogMarkingComponent', () => {
  let component: LogMarkingComponent;
  let fixture: ComponentFixture<LogMarkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogMarkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogMarkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
