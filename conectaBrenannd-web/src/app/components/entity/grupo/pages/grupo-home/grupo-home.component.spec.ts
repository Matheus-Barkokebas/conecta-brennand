import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoHomeComponent } from './grupo-home.component';

describe('GrupoHomeComponent', () => {
  let component: GrupoHomeComponent;
  let fixture: ComponentFixture<GrupoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GrupoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
