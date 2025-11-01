import { Routes } from '@angular/router';
import { NewComunicadosComponent } from './pages/new-comunicados/new-comunicados.component';
import { ListComunicadosComponent } from './pages/list-comunicados/list-comunicados.component';
import { EditComunicadosComponent } from './pages/edit-comunicados/edit-comunicados.component';

export const COMUNICADOS_ROUTES: Routes = [
  {
    path: 'new',
    component: NewComunicadosComponent,
    data: { title: 'Cadastrar Comunicado' },
  },
  {
    path: 'list',
    component: ListComunicadosComponent,
    data: { title: 'Listar Comunicado' },
  },
  {
    path: 'edit/:id',
    component: EditComunicadosComponent,
    data: { title: 'Editar Comunicado' },
  },
];
