import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },

  {
    path: '',
    redirectTo: 'ingressos',
    pathMatch: 'full',
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  { path: 'login', component: LoginComponent, data: { title: 'Login' } },

  { path: 'home', component: HomePageComponent, data: { title: 'home' } },

  {
    path: 'usuarios',
    loadChildren: () =>
      import('./components/entity/usuario/usuario.routes').then(
        (m) => m.USUARIO_ROUTES
      ),
  },

  {
    path: 'ingressos',
    loadChildren: () =>
      import('./components/entity/ingresso/ingresso.routes').then(
        (m) => m.INGRESSO_ROUTES
      ),
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/dashboard-admin/dashboard.routes').then(
        (m) => m.DASHBOARD_ROUTES
      ),
  },
];
