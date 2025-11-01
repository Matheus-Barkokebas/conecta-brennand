import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadosTableComponent } from './comunicados-table.component';

describe('ComunicadosTableComponent', () => {
  let component: ComunicadosTableComponent;
  let fixture: ComponentFixture<ComunicadosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunicadosTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComunicadosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
