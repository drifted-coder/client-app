import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TicketService {

  api = 'http://localhost:8000/api/tickets';

  constructor(private http: HttpClient) { }

  getTickets = (params: any): Observable<any> => {
    return this.http.get(this.api, { params });
  }

  getTicketById = (id: string): Observable<any> => {
    return this.http.get(`${this.api}/${id}`);
  }

  create = (data: any): Observable<any> => {
    return this.http.post(this.api, data);
  }

  update = (id: string, data: any): Observable<any> => {
    return this.http.patch(`${this.api}/${id}`, data);
  }

  addComment = (ticketId: string, message: string): Observable<any> => {

    return this.http.post(
      `/api/tickets/${ticketId}/comments`,
      { message }
    );

  }


}
