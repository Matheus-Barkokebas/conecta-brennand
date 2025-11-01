import { Routes } from '@angular/router';
import { NewUsuarioComponent } from './pages/new-usuario/new-usuario.component';
import { ListUsuarioComponent } from './pages/list-usuario/list-usuario.component';
import { EditUsuarioComponent } from './pages/edit-usuario/edit-usuario.component';

export const USUARIO_ROUTES: Routes = [
  {
    path: 'new',
    component: NewUsuarioComponent,
    data: { title: 'Cadastrar Usuario' },
  },
  {
    path: 'list',
    component: ListUsuarioComponent,
    data: { title: 'Listar Usuario' },
  },
  {
    path: 'edit/:id',
    component: EditUsuarioComponent,
    data: { title: 'Editar Usuario' },
  },
];
