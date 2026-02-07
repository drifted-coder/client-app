import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://localhost:8000/api/auth';

  constructor(private http: HttpClient) {}

  login = (data:any): Observable<any> => {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register = (data:any): Observable<any> => {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  refresh = (refreshToken: string | null): Observable<any> => {
    return this.http.post(`${this.apiUrl}/refresh`, {refreshToken});
  }

  logout = (userId:string, refreshToken: string | null): Observable<any> => {
    return this.http.post(`${this.apiUrl}/logout`, {userId, refreshToken});
  }

}

