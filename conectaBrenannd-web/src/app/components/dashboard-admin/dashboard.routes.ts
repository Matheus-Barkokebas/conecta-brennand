import { Routes } from "@angular/router";
import { DashboardAdminComponent } from "./dashboard-admin/dashboard-admin.component";

export const DASHBOARD_ROUTES: Routes = [
  { path: 'view', component: DashboardAdminComponent, data: { title: 'Visualizar DashBoards' } },
];
