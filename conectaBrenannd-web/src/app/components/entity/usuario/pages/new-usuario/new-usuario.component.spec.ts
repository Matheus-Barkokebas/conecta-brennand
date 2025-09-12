import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUsuarioComponent } from './new-usuario.component';

describe('NewUsuarioComponent', () => {
  let component: NewUsuarioComponent;
  let fixture: ComponentFixture<NewUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
