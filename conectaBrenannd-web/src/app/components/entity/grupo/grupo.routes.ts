import { Routes } from '@angular/router';
import { NewGrupoComponent } from './pages/new-grupo/new-grupo.component';
import { ListGrupoComponent } from './pages/list-grupo/list-grupo.component';
import { EditGrupoComponent } from './pages/edit-grupo/edit-grupo.component';
import { GrupoHomeComponent } from './pages/grupo-home/grupo-home.component';

export const GRUPO_ROUTES: Routes = [
  {
    path: 'new',
    component: NewGrupoComponent,
    data: { title: 'Cadastrar Grupo' },
  },
  {
    path: 'meus',
    component: ListGrupoComponent,
    data: { title: 'Listar Grupo' },
  },
  {
    path: 'edit/:id',
    component: EditGrupoComponent,
    data: { title: 'Editar Grupo' },
  },
  {
    path: 'homeGrupos',
    component: GrupoHomeComponent,
    data: { title: 'Listar Grupo' },
  },
];
