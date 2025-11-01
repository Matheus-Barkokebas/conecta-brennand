import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenteTableComponent } from './dependente-table.component';

describe('DependenteTableComponent', () => {
  let component: DependenteTableComponent;
  let fixture: ComponentFixture<DependenteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependenteTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DependenteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
