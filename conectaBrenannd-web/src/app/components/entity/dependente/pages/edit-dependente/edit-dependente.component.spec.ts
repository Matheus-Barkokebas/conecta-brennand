import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDependenteComponent } from './edit-dependente.component';

describe('EditDependenteComponent', () => {
  let component: EditDependenteComponent;
  let fixture: ComponentFixture<EditDependenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDependenteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditDependenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
