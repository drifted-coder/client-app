import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient){}

  getUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }

  updateUser = (id: string, data: any): Observable<any> => {
    return this.http.patch(`${this.apiUrl}/users/${id}`, data);
  }

}
