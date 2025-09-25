import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIngressoComponent } from './list-ingresso.component';

describe('ListIngressoComponent', () => {
  let component: ListIngressoComponent;
  let fixture: ComponentFixture<ListIngressoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListIngressoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListIngressoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
