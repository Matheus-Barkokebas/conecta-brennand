import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadosFormComponent } from './comunicados-form.component';

describe('ComunicadosFormComponent', () => {
  let component: ComunicadosFormComponent;
  let fixture: ComponentFixture<ComunicadosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunicadosFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComunicadosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
