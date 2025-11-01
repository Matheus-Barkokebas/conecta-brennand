import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenteFormsComponent } from './dependente-forms.component';

describe('DependenteFormsComponent', () => {
  let component: DependenteFormsComponent;
  let fixture: ComponentFixture<DependenteFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependenteFormsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DependenteFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
