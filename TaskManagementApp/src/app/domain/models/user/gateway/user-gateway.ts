import { Observable } from 'rxjs';
import { UserResponse } from './user-response';
import { UserLoginRequest, UserRequest } from './user-request';

export abstract class UserGateway {
  abstract login(userAuth: UserLoginRequest): Observable<{ token: string }>;
  abstract createUser(userInput: UserRequest): Observable<UserResponse>;
  abstract getUsers(): Observable<UserResponse[]>;
  abstract getUserById(id: string): Observable<UserResponse>;
  abstract updateUser(id: string, userInput: UserRequest): Observable<UserResponse>;
  abstract deleteUser(id: string): Observable<void>;
}
