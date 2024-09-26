import { Router } from '@angular/router';

export class RoutesModulesApp {
  private static navTo: Router;
  constructor(route: Router) {
    RoutesModulesApp.navTo = route;
  }

  static MAGICLINK: string = 'aplication/magic-link';
  static UNAUTHORIZED: string = 'aplication/unauthorized';
  static NOTFOUND: string = 'aplication/not-found';
  static LOGOUT: string = 'aplication/logout';

  static DASHBOARD: string = 'aplication/dashboard';
  static SETTINGS: string = 'aplication/settings';
  static EVALUATIONS: string = 'aplication/evaluations';
  static REPORTS: string = 'aplication/reports';

  static getRoute(index: number): string {
    switch (index) {
      case 0:
        return RoutesModulesApp.DASHBOARD;
      case 1:
        return RoutesModulesApp.SETTINGS;
      case 2:
        return RoutesModulesApp.EVALUATIONS;
      case 3:
        return RoutesModulesApp.REPORTS;
      default:
        return RoutesModulesApp.DASHBOARD;
    }
  }
}
