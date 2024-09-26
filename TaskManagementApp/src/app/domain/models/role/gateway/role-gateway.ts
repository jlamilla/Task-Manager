import { Observable } from 'rxjs';
import { RoleResponse } from './role-response';

export abstract class RoleGateway {
  abstract getRoles(): Observable<RoleResponse[]>;
  abstract getRoleById(id: number): Observable<RoleResponse>;
}
