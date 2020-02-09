import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URI = 'http://127.0.0.1:3000/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User> {
    return this.http.get(`${this.API_URI}`);
  }

  getUser(id: string|number): Observable<User> {
    return this.http.get(`${this.API_URI}/${id}`);
  }

  login(id: string|number): Observable<User> {
    return this.http.get(`${this.API_URI}/login/${id}`);
  }

  saveUser(user: User): Observable<User> {
    return this.http.post(`${this.API_URI}`, user);
  }

  deleteUser(id: string|number): Observable<User> {
    return this.http.delete(`${this.API_URI}/${id}`);
  }

  updateUser(id: string|number, user: User): Observable<User> {
    return this.http.put(`${this.API_URI}/${id}`, user);
  }

}
