import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIngressoComponent } from './edit-ingresso.component';

describe('EditIngressoComponent', () => {
  let component: EditIngressoComponent;
  let fixture: ComponentFixture<EditIngressoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIngressoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIngressoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
