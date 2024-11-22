// src/app/task.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:9090/user';

  constructor(private http: HttpClient) { }

  // Método para buscar as tarefas
  getTasks(): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(this.apiUrl + "/users", {
      observe: 'response'
    });
  }

  deleteUser(id: number) {
    return this.http.delete(this.apiUrl + `/${id}`, {
      observe: 'response',
      responseType: 'text'
    });
  }

  updateUser(data: any): Observable<HttpResponse<any>> {
    return this.http.put(
      this.apiUrl ,
      {
        id: data.id,
        name: data.name,
        email: data.email
      },
      { observe: 'response' }
    );
  }

  createUser(data: any): Observable<HttpResponse<any>> {
    return this.http.post(
      this.apiUrl ,
      {
        name: data.name,
        email: data.email
      },
      { observe: 'response' }
    );
  }
}
