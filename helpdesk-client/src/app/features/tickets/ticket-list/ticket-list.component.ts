import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../core/services/ticket.service';
import { Ticket } from '../../../core/models/ticket.model.ts';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss'
})
export class TicketListComponent implements OnInit {

  page: number = 1;
  statusFilter!: string;
  tickets!: Ticket[]
  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getTickets({
      page: this.page,
      limit: 10,
      status: this.statusFilter
    }).subscribe((res: any) => {
      this.tickets = res.data;
    });

  }

}
