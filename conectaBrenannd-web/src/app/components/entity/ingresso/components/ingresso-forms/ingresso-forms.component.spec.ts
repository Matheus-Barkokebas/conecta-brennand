import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngressoFormComponent } from './ingresso-forms.component';

describe('IngressoFormsComponent', () => {
  let component: IngressoFormComponent;
  let fixture: ComponentFixture<IngressoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngressoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngressoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
