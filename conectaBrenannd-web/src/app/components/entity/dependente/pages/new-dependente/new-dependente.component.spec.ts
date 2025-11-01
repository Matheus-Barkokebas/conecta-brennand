import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDependenteComponent } from './new-dependente.component';

describe('NewDependenteComponent', () => {
  let component: NewDependenteComponent;
  let fixture: ComponentFixture<NewDependenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDependenteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewDependenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
