import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TicketService {

  apiUrl = 'http://localhost:8000/api/tickets';

  constructor(private http: HttpClient) { }

  getTickets = (params: any): Observable<any> => {
    return this.http.get(this.apiUrl, { params });
  }

  getTicketById = (id: string): Observable<any> => {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create = (data: any): Observable<any> => {
    return this.http.post(this.apiUrl, data);
  }

  update = (id: string, data: any): Observable<any> => {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }

  addComment = (ticketId: string, message: string): Observable<any> => {

    return this.http.post(
      `/api/tickets/${ticketId}/comments`,
      { message }
    );

  }

  getComments = (ticketId: string): Observable<any> => {
    return this.http.get(
      `${this.apiUrl}/${ticketId}/comments`,
    );

  }


}
