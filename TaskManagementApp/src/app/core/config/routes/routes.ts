import { Routes } from '@angular/router';
import { RoutesModulesApp } from './routes-modules-app';

import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { LoginPageComponent } from 'src/app/UI/pages/auth/pages/login-page/login-page.component';
import { Error404PageComponent } from 'src/app/UI/shared/pages/error404-page/error404-page.component';
import { DashboardLayoutComponent } from 'src/app/UI/pages/dashboard/layouts/dashboard-layout/dashboard-layout.component';

export class AppRoutes {
  static appRoutes: Routes = [

    { path: RoutesModulesApp.UNAUTHORIZED, component: LoginPageComponent },
    { path: RoutesModulesApp.NOTFOUND, component: Error404PageComponent },

    // APLICATION
    {
      path: '',
      redirectTo: RoutesModulesApp.DASHBOARD,
      pathMatch: 'full',
    },
    { path: RoutesModulesApp.DASHBOARD, component: DashboardLayoutComponent, canActivate: [AuthGuard] },

    // Not found
    { path: '**', redirectTo: RoutesModulesApp.NOTFOUND },
  ];
}
