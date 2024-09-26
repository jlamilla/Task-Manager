import { Observable } from 'rxjs';
import { TaskResponse } from './task-response';
import { TaskRequest } from './task-request';

export abstract class TaskGateway {
  abstract createTask(taskInput: TaskRequest): Observable<TaskResponse>;
  abstract getTasks(): Observable<TaskResponse[]>;
  abstract getTaskById(id: string): Observable<TaskResponse>;
  abstract updateTask(id: string, taskInput: TaskRequest): Observable<TaskResponse>;
  abstract deleteTask(id: string): Observable<void>;
}
