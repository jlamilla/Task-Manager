import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGateway } from 'src/app/domain/models/user/gateway/user-gateway';
import { UserResponse } from 'src/app/domain/models/user/gateway/user-response';
import { UserLoginRequest, UserRequest } from 'src/app/domain/models/user/gateway/user-request';
import { ApiService } from '../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends UserGateway {
  constructor(private _http: ApiService) { super(); }

  login(userAuth: UserLoginRequest): Observable<{token: string}> {
    return this._http.post<{token: string}>({
      url: 'Auth/login',
      body: userAuth,
    });
  }

  getUsers(): Observable<UserResponse[]> {
    return this._http.get<UserResponse[]>({
      url: 'get-users',
    });
  }

  getUserById(id: string): Observable<UserResponse> {
    return this._http.get<UserResponse>({
      url: `get-user/${id}`,
    });
  }

  createUser(userInput: UserRequest): Observable<UserResponse> {
    return this._http.post<UserResponse>({
      url: 'create-user',
      body: userInput,
    });
  }

  updateUser(id: string, userInput: UserRequest): Observable<UserResponse> {
    return this._http.put<UserResponse>({
      url: `update-user/${id}`,
      body: userInput,
    });
  }

  deleteUser(id: string): Observable<void> {
    return this._http.delete<void>({
      url: `delete-user/${id}`,
    });
  }
}
