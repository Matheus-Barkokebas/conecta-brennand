import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngressoTableComponent } from './ingresso-table.component';

describe('IngressoTableComponent', () => {
  let component: IngressoTableComponent;
  let fixture: ComponentFixture<IngressoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngressoTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngressoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
