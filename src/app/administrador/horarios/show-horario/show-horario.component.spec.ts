import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHorarioComponent } from './show-horario.component';

describe('ShowHorarioComponent', () => {
  let component: ShowHorarioComponent;
  let fixture: ComponentFixture<ShowHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
