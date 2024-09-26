import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskApiService } from './task-api.service';
import { ApiService } from '../../services/api.service';
import { TaskRequest } from 'src/app/domain/models/task/gateway/task-request';
import { TaskResponse } from 'src/app/domain/models/task/gateway/task-response';

describe('TaskApiService', () => {
  let service: TaskApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskApiService, ApiService]
    });
    service = TestBed.inject(TaskApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of tasks', () => {
    const mockResponse: TaskResponse[] = [
      {
        data: { id: '09F1F681-4FE5-4EB4-DA3D-08DCD61476AC', title: 'Task 1', description: 'Description 1', userId: 1, createDate: new Date(), createBy: 'admin', status: 'Pending' },
        message: 'Success'
      }
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].data.title).toBe('Task 1');
    });

    const req = httpMock.expectOne('get-tasks');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create a new task', () => {
    const mockTaskRequest: TaskRequest = {
      title: 'New Task',
      description: 'Task Description',
      userId: 1,
      status: 'Pending'
    };

    const mockResponse: TaskResponse = {
      data: { id: '09F1F681-4FE5-4EB4-DA3D-08DCD61476AC', title: 'New Task', description: 'Task Description', userId: 1, createDate: new Date(), createBy: 'admin', status: 'Pending' },
      message: 'Task created successfully'
    };

    service.createTask(mockTaskRequest).subscribe(response => {
      expect(response.message).toBe('Task created successfully');
      expect(response.data.title).toBe('New Task');
    });

    const req = httpMock.expectOne('create-task');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockTaskRequest);
    req.flush(mockResponse);
  });
});
