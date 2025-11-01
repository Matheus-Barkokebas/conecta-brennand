import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIngressoComponent } from './new-ingresso.component';

describe('NewIngressoComponent', () => {
  let component: NewIngressoComponent;
  let fixture: ComponentFixture<NewIngressoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewIngressoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewIngressoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
