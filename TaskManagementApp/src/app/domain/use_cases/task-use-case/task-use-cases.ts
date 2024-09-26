import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskGateway } from 'src/app/domain/models/task/gateway/task-gateway';
import { TaskRequest } from 'src/app/domain/models/task/gateway/task-request';
import { TaskResponse } from 'src/app/domain/models/task/gateway/task-response';

@Injectable({
  providedIn: 'root'
})
export class TaskUseCases {
  constructor(private _taskGateway: TaskGateway) {}

  getTasks(): Observable<TaskResponse[]> {
    return this._taskGateway.getTasks();
  }

  getTaskById(id: string): Observable<TaskResponse> {
    return this._taskGateway.getTaskById(id);
  }

  createTask(taskRequest: TaskRequest): Observable<TaskResponse> {
    return this._taskGateway.createTask(taskRequest);
  }

  updateTask(id: string, taskRequest: TaskRequest): Observable<TaskResponse> {
    return this._taskGateway.updateTask(id, taskRequest);
  }

  deleteTask(id: string): Observable<void> {
    return this._taskGateway.deleteTask(id);
  }

}
