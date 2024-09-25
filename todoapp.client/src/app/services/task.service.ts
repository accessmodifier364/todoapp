import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type Task = {
  taskId?: number;
  title: string;
  description?: string;
  dueDate: Date;
  isCompleted: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = '/api/tasks';

  constructor(private http: HttpClient) {}

  createTask(task: any): Observable<any> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  getTasks(): Observable<any> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  updateTask(task: any): Observable<any> {
    return this.http.put<Task>(`${this.apiUrl}/${task.taskId}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<Task>(`${this.apiUrl}/${id}`);
  }
}
