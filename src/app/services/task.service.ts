// src/app/task.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:9090/task';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<HttpResponse<Task[]>> {
    return this.http.get<Task[]>(this.apiUrl + "/tasks", {
      observe: 'response'
    });
  }

  deleteTask(id: number) {
    return this.http.delete(this.apiUrl + `/${id}`, {
      observe: 'response',
      responseType: 'text'
    });
  }

  createTask(data: any) {
    return this.http.post(
      this.apiUrl,
      {
        title: data.title,
        description: data.description,
        status: data.status,
        limitDate: data.limitDate,
        userId: data.userId
      },
      { observe: 'response', responseType: 'text' }
    );
  }

  updateTask(data: any) {
    return this.http.put(
      this.apiUrl,
      {
        id: data.id,
        title: data.title,
        description: data.description,
        status: data.status,
        limitDate: data.limitDate
      },
      { observe: 'response', responseType: 'text' }
    );
  }

}
