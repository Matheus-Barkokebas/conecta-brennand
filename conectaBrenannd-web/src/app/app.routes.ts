import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },

  { path: 'login', component: LoginComponent, data: { title: 'Login' } },

  {
    path: 'usuarios',
    loadChildren: () =>
      import('./components/entity/usuario/usuario.routes').then(
        (m) => m.USUARIO_ROUTES
      ),
  },
];
