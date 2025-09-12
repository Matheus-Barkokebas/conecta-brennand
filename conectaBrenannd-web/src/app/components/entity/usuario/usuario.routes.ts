import { Routes } from '@angular/router';
import { ListUsuarioPage } from './pages/list-usuario/list-usuario.component';
import { NewUsuarioPage } from './pages/new-usuario/new-usuario.component';
import { EditUsuarioPage } from './pages/edit-usuario/edit-usuario.component';

export const USUARIO_ROUTES: Routes = [
  { path: '', component: ListUsuarioPage },
  { path: 'new', component: NewUsuarioPage },
  { path: 'edit/:id', component: EditUsuarioPage }
];
