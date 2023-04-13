import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarAtualizarComponent } from './cadastrar-atualizar.component';

describe('CadastrarAtualizarComponent', () => {
  let component: CadastrarAtualizarComponent;
  let fixture: ComponentFixture<CadastrarAtualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarAtualizarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
