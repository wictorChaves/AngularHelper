import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmesRxComponent } from './filmes-rx.component';

describe('FilmesRxComponent', () => {
  let component: FilmesRxComponent;
  let fixture: ComponentFixture<FilmesRxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmesRxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmesRxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
