import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarIngressoComponent } from './validar-ingresso.component';

describe('ValidarIngressoComponent', () => {
  let component: ValidarIngressoComponent;
  let fixture: ComponentFixture<ValidarIngressoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidarIngressoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidarIngressoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
