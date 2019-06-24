import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPadresComponent } from './perfil-padres.component';

describe('PerfilPadresComponent', () => {
  let component: PerfilPadresComponent;
  let fixture: ComponentFixture<PerfilPadresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilPadresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilPadresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
