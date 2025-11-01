import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComunicadosComponent } from './list-comunicados.component';

describe('ListComunicadosComponent', () => {
  let component: ListComunicadosComponent;
  let fixture: ComponentFixture<ListComunicadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComunicadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComunicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
