import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string | null = window.sessionStorage.getItem('token');

  isAuthenticated(): boolean {
    if (this.token == null) return false;
    if (this.token == 'null') return false;
    if (this.token == undefined) return false;
    if (this.token == 'undefined') return false;
    if (this.token == '') return false;

    if (this.token.length > 0) return true;

    return false;
  }

  login(token: string): void {
    this.token = token;
    window.sessionStorage.setItem('token', this.token);
  }

  logout(): void {
    this.token = null;
    window.sessionStorage.removeItem('token');
  }

  getToken(): string | null {
    return window.sessionStorage.getItem('token');
  }
}
