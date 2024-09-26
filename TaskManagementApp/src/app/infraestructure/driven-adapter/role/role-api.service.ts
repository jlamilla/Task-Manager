import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleGateway } from 'src/app/domain/models/role/gateway/role-gateway';
import { RoleResponse } from 'src/app/domain/models/role/gateway/role-response';
import { ApiService } from '../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleApiService extends RoleGateway {
  constructor(private _http: ApiService) { super(); }

  getRoles(): Observable<RoleResponse[]> {
    return this._http.get<RoleResponse[]>({
      url: 'get-roles',
    });
  }

  getRoleById(id: number): Observable<RoleResponse> {
    return this._http.get<RoleResponse>({
      url: `get-role/${id}`,
    });
  }

}
