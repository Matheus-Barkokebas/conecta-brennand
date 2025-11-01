import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComunicadosComponent } from './new-comunicados.component';

describe('NewComunicadosComponent', () => {
  let component: NewComunicadosComponent;
  let fixture: ComponentFixture<NewComunicadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewComunicadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewComunicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
