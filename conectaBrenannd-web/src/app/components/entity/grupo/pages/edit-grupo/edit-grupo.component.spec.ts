import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGrupoComponent } from './edit-grupo.component';

describe('EditGrupoComponent', () => {
  let component: EditGrupoComponent;
  let fixture: ComponentFixture<EditGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditGrupoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
