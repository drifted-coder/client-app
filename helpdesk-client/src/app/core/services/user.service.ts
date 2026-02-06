import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient){}

  getUsers() {
    return this.http.get('/api/users');
  }

  updateUser = (id: string, data: any): Observable<any> => {
    return this.http.patch(`/api/users/${id}`, data);
  }

}
