import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestExamComponent } from './request-exam.component';

describe('RequestExamComponent', () => {
  let component: RequestExamComponent;
  let fixture: ComponentFixture<RequestExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
