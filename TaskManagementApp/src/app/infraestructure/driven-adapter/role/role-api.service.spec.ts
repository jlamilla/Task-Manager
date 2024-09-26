import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoleApiService } from './role-api.service';
import { ApiService } from '../../services/api.service';
import { RoleResponse } from 'src/app/domain/models/role/gateway/role-response';

describe('RoleApiService', () => {
  let service: RoleApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoleApiService, ApiService]
    });
    service = TestBed.inject(RoleApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of roles', () => {
    const mockResponse: RoleResponse[] = [
      {
        data: { id: 1, roleName: 'Admin', createDate: new Date(), createBy: 'system' },
        message: 'Success'
      }
    ];

    service.getRoles().subscribe(roles => {
      expect(roles.length).toBe(1);
      expect(roles[0].data.roleName).toBe('Admin');
    });

    const req = httpMock.expectOne('get-roles');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
