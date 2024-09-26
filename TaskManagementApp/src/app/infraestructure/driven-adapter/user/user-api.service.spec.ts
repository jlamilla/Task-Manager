import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserApiService } from './user-api.service';
import { ApiService } from '../../services/api.service';
import { UserRequest } from 'src/app/domain/models/user/gateway/user-request';
import { UserResponse } from 'src/app/domain/models/user/gateway/user-response';

describe('UserApiService', () => {
  let service: UserApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserApiService, ApiService]
    });
    service = TestBed.inject(UserApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of users', () => {
    const mockResponse: UserResponse[] = [
      {
        data: { id: 1, name: 'John Doe', email: 'john@example.com', passwordHash: 'hashed', roleId: 1, createDate: new Date(), createBy: 'admin' },
        message: 'Success'
      }
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users[0].data.name).toBe('John Doe');
    });

    const req = httpMock.expectOne('get-users');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create a new user', () => {
    const mockUserRequest: UserRequest = {
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      roleId: 1
    };

    const mockResponse: UserResponse = {
      data: { id: 1, name: 'John Doe', email: 'john@example.com', passwordHash: 'hashed', roleId: 1, createDate: new Date(), createBy: 'admin' },
      message: 'User created successfully'
    };

    service.createUser(mockUserRequest).subscribe(response => {
      expect(response.message).toBe('User created successfully');
      expect(response.data.name).toBe('John Doe');
    });

    const req = httpMock.expectOne('create-user');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUserRequest);
    req.flush(mockResponse);
  });

  it('should handle error when creating a new user', () => {
    const mockUserRequest: UserRequest = {
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      roleId: 1
    };

    service.createUser(mockUserRequest).subscribe(
      () => fail('Should have failed with 400 status'),
      (error) => {
        expect(error.status).toBe(400);
      }
    );

    const req = httpMock.expectOne('create-user');
    req.flush('Invalid request', { status: 400, statusText: 'Bad Request' });
  });
});
