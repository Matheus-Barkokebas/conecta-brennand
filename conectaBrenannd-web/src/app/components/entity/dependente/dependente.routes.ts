import { Routes } from '@angular/router';
import { NewDependenteComponent } from './pages/new-dependente/new-dependente.component';
import { ListDependenteComponent } from './pages/list-dependente/list-dependente.component';
import { EditDependenteComponent } from './pages/edit-dependente/edit-dependente.component';

export const DEPENDENTE_ROUTES: Routes = [
  {
    path: 'new',
    component: NewDependenteComponent,
    data: { title: 'Cadastrar Dependente' },
  },
  {
    path: 'meus',
    component: ListDependenteComponent,
    data: { title: 'Listar Dependente' },
  },
  {
    path: 'edit/:id',
    component: EditDependenteComponent,
    data: { title: 'Editar Dependente' },
  },
];
