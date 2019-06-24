import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorCursoComponent } from './selector-curso.component';

describe('SelectorCursoComponent', () => {
  let component: SelectorCursoComponent;
  let fixture: ComponentFixture<SelectorCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
