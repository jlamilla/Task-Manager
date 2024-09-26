import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskGateway } from 'src/app/domain/models/task/gateway/task-gateway';
import { TaskResponse } from 'src/app/domain/models/task/gateway/task-response';
import { TaskRequest } from 'src/app/domain/models/task/gateway/task-request';
import { ApiService } from '../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService extends TaskGateway {
  constructor(private _http: ApiService) { super(); }

  getTasks(): Observable<TaskResponse[]> {
    return this._http.get<TaskResponse[]>({
      url: 'get-tasks',
    });
  }

  getTaskById(id: string): Observable<TaskResponse> {
    return this._http.get<TaskResponse>({
      url: `get-task/${id}`,
    });
  }

  createTask(taskInput: TaskRequest): Observable<TaskResponse> {
    return this._http.post<TaskResponse>({
      url: 'create-task',
      body: taskInput,
    });
  }

  updateTask(id: string, taskInput: TaskRequest): Observable<TaskResponse> {
    return this._http.put<TaskResponse>({
      url: `update-task/${id}`,
      body: taskInput,
    });
  }

  deleteTask(id: string): Observable<void> {
    return this._http.delete<void>({
      url: `delete-task/${id}`,
    });
  }
}
