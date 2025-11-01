import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPesquisaComponent } from './new-pesquisa.component';

describe('NewPesquisaComponent', () => {
  let component: NewPesquisaComponent;
  let fixture: ComponentFixture<NewPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPesquisaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
