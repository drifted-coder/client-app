import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecoderFunc } from '../../utils/jwtDecoder';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getDashboardData = (): Observable<any> => {

    const token = jwtDecoderFunc(localStorage.getItem('accessToken'));

    const endPoint =
      (token.role === 'agent' || token.role === 'admin')
        ? '/'
        : '/user';

    return this.http.get<any>(
      `${this.apiUrl}/dashboard${endPoint}`
    );
  }

}
