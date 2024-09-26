import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { RoutesModulesApp } from '../config/routes/routes-modules-app';
import { AuthService } from 'src/app/infraestructure/services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) return true;

  const router = inject(Router);

  return router.createUrlTree([RoutesModulesApp.UNAUTHORIZED]);
};
