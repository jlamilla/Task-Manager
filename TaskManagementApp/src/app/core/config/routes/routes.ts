import { Routes } from '@angular/router';
import { RoutesModulesApp } from './routes-modules-app';
import { Parameterization } from 'src/app/presentation/pages/parameterization/parameterization.component';
import { SettingsComponent } from 'src/app/presentation/pages/settings/settings.component';
import { EvaluationsComponent } from 'src/app/presentation/pages/evaluations/evaluations.component';
import { ReportsComponent } from 'src/app/presentation/pages/reports/reports.component';
import { MagicLinkComponent } from 'src/app/presentation/pages/magic-link/magic-link.component';
import { NotFoundComponent } from 'src/app/presentation/pages/not-found/not-found.component';
import { LogoutComponent } from 'src/app/presentation/pages/logout/logout.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { UnauthorizedComponent } from 'src/app/presentation/pages/unauthorized/unauthorized.component';

export class AppRoutes {
  static appRoutes: Routes = [

    // MAGICLINK
    { path: RoutesModulesApp.MAGICLINK, component: MagicLinkComponent },
    { path: RoutesModulesApp.UNAUTHORIZED, component: UnauthorizedComponent },
    { path: RoutesModulesApp.NOTFOUND, component: NotFoundComponent },
    { path: RoutesModulesApp.LOGOUT, component: LogoutComponent },

    // APLICATION
    {
      path: '',
      redirectTo: RoutesModulesApp.PARAMETERIZATION,
      pathMatch: 'full',
    },
    { path: RoutesModulesApp.PARAMETERIZATION, component: Parameterization, canActivate: [AuthGuard] },
    { path: RoutesModulesApp.SETTINGS, component: SettingsComponent, canActivate: [AuthGuard] },
    { path: RoutesModulesApp.EVALUATIONS, component: EvaluationsComponent, canActivate: [AuthGuard] },
    { path: RoutesModulesApp.REPORTS, component: ReportsComponent, canActivate: [AuthGuard] },

    // Not found
    { path: '**', redirectTo: RoutesModulesApp.NOTFOUND },
  ];
}
