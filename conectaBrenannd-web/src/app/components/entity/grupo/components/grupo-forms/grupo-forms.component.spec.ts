import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoFormsComponent } from './grupo-forms.component';

describe('GrupoFormsComponent', () => {
  let component: GrupoFormsComponent;
  let fixture: ComponentFixture<GrupoFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
