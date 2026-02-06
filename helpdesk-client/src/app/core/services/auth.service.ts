import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = 'http://localhost:8000/api/auth';

  constructor(private http: HttpClient) {}

  login = (data:any): Observable<any> => {
    return this.http.post(`${this.api}/login`, data);
  }

  register = (data:any): Observable<any> => {
    return this.http.post(`${this.api}/register`, data);
  }

  refresh = (): Observable<any> => {
    return this.http.post(`${this.api}/refresh`, {});
  }

  logout = (): Observable<any> => {
    return this.http.post(`${this.api}/logout`, {});
  }

}

