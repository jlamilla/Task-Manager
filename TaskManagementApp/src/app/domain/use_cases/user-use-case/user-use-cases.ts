import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGateway } from 'src/app/domain/models/user/gateway/user-gateway';
import { UserLoginRequest, UserRequest } from 'src/app/domain/models/user/gateway/user-request';
import { UserResponse } from 'src/app/domain/models/user/gateway/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserUseCases {
  constructor(private _userGateway: UserGateway) {}

  login(userAuth: UserLoginRequest): Observable<{ token: string }> {
    return this._userGateway.login(userAuth);
}

  getUsers(): Observable<UserResponse[]> {
    return this._userGateway.getUsers();
  }

  createUser(userRequest: UserRequest): Observable<UserResponse> {
    return this._userGateway.createUser(userRequest);
  }

  updateUser(id: string, userRequest: UserRequest): Observable<UserResponse> {
    return this._userGateway.updateUser(id, userRequest);
  }

  deleteUser(id: string): Observable<void> {
    return this._userGateway.deleteUser(id);
  }

  getUserById(id: string): Observable<UserResponse> {
    return this._userGateway.getUserById(id);
  }
}
