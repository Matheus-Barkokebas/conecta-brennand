import { Routes } from "@angular/router";
import { NewIngressoComponent } from "./pages/new-ingresso/new-ingresso.component";

export const INGRESSO_ROUTES: Routes = [
  { path: 'new', component: NewIngressoComponent, data: { title: 'Cadastrar Ingresso' } },
  //{ path: 'list', component: , data: { title: 'Listar ' } },
  //{ path: 'edit/:id', component: , data: { title: 'Editar ' } },
];
