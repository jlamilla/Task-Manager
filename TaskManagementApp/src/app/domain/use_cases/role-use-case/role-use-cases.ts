import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleGateway } from 'src/app/domain/models/role/gateway/role-gateway';
import { RoleResponse } from 'src/app/domain/models/role/gateway/role-response';

@Injectable({
  providedIn: 'root'
})
export class RoleUseCases {
  constructor(private _roleGateway: RoleGateway) {}

  getRoles(): Observable<RoleResponse[]> {
    return this._roleGateway.getRoles();
  }

  getRoleById(id: number): Observable<RoleResponse> {
    return this._roleGateway.getRoleById(id);
  }
}
