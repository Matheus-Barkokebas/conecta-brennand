import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDependenteComponent } from './list-dependente.component';

describe('ListDependenteComponent', () => {
  let component: ListDependenteComponent;
  let fixture: ComponentFixture<ListDependenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDependenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDependenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
