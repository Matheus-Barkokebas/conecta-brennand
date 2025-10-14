import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGrupoComponent } from './list-grupo.component';

describe('ListGrupoComponent', () => {
  let component: ListGrupoComponent;
  let fixture: ComponentFixture<ListGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGrupoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
