import { Routes } from '@angular/router';
import { NewIngressoComponent } from './pages/new-ingresso/new-ingresso.component';
import { ListIngressoComponent } from './pages/list-ingresso/list-ingresso.component';
import { EditIngressoComponent } from './pages/edit-ingresso/edit-ingresso.component';
import { ValidarIngressoComponent } from './pages/validar-ingresso/validar-ingresso.component';

export const INGRESSO_ROUTES: Routes = [
  {
    path: 'new',
    component: NewIngressoComponent,
    data: { title: 'Cadastrar Ingresso' },
  },
  {
    path: 'meus',
    component: ListIngressoComponent,
    data: { title: 'Listar Ingressos' },
  },
  {
    path: 'edit/:id',
    component: EditIngressoComponent,
    data: { title: 'Editar Ingresso' },
  },
  {
    path: 'validar',
    component: ValidarIngressoComponent,
    data: { title: 'Editar Ingresso' },
  },
];
