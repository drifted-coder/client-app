import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://localhost:8000/api/auth';

  // for dashboard dynamic api call
  private tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('accessToken')
  );

  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) { }

  login = (data: any): Observable<any> => {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register = (data: any): Observable<any> => {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  refresh = (refreshToken: string | null): Observable<any> => {
    return this.http.post(`${this.apiUrl}/refresh`, { refreshToken });
  }

  logout = (userId: string, refreshToken: string | null): Observable<any> => {
    return this.http.post(`${this.apiUrl}/logout`, { userId, refreshToken });
  }


  setToken(token: string) {
    localStorage.setItem('accessToken', token);
    this.tokenSubject.next(token);
  }

  getToken() {
    return this.tokenSubject.value;
  }
}

