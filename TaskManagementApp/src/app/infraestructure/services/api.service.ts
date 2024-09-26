import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environments } from 'src/environments/environments';

export interface ApiRequestConfig {
  url: string;
  body?: any;
  headers?: HttpHeaders;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private readonly baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private createHeaders(headers?: HttpHeaders): HttpHeaders {
    let token = this.authService.getToken();
    if (!headers) {
      headers = new HttpHeaders();
    }
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  get<T>(config: ApiRequestConfig): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${config.url}`, {
      headers: this.createHeaders(config.headers),
    });
  }

  post<T>(config: ApiRequestConfig): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${config.url}`, config.body, {
      headers: this.createHeaders(config.headers),
    });
  }

  put<T>(config: ApiRequestConfig): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${config.url}`, config.body, {
      headers: this.createHeaders(config.headers),
    });
  }

  delete<T>(config: ApiRequestConfig): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${config.url}`, {
      headers: this.createHeaders(config.headers),
    });
  }
}
