import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaFormComponent } from './pesquisa-form.component';

describe('PesquisaFormComponent', () => {
  let component: PesquisaFormComponent;
  let fixture: ComponentFixture<PesquisaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PesquisaFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PesquisaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
