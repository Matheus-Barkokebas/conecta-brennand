import { Routes } from '@angular/router';
import { NewPesquisaComponent } from './pages/new-pesquisa/new-pesquisa.component';

export const PESQUISA_ROUTES: Routes = [
  {
    path: 'new',
    component: NewPesquisaComponent,
    data: { title: 'Cadastrar Pesquisa' },
  },
];
