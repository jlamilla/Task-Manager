import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../infraestructure/services/auth.service';
import { inject } from '@angular/core';
import { RoutesModulesApp } from '../config/routes/routes-modules-app';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) return true;

  const router = inject(Router);

  return router.createUrlTree([RoutesModulesApp.UNAUTHORIZED]);
};
