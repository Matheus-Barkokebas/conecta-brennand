import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComunicadosComponent } from './edit-comunicados.component';

describe('EditComunicadosComponent', () => {
  let component: EditComunicadosComponent;
  let fixture: ComponentFixture<EditComunicadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditComunicadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComunicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
