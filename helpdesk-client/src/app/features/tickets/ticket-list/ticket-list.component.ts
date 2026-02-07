import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../core/services/ticket.service';
import { Ticket } from '../../../core/models/ticket.model.ts';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss'
})
export class TicketListComponent implements OnInit {

  ticketsData: any[] = [];
  filteredTickets: any[] = [];
  paginatedTickets: any[] = [];
  ticketSearchForm!: FormGroup

  statusList = ['Open', 'Closed', 'Pending'];
  priorityList = ['High', 'Medium', 'Low'];
  categoryList = ['Bug', 'Feature', 'Task'];

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalTicketsData = 0;

  constructor(private ticketService: TicketService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ticketSearchForm = this.fb.group({
      search: [''],
      status: [''],
      priority: [''],
      category: ['']
    });
    this.loadTickets();
  }

  loadTickets(currentPage: number = 1) {

    const filters: any = {
      page: currentPage,
      limit: this.pageSize
    };

    const status = this.ticketSearchForm.get('status')?.value;
    const priority = this.ticketSearchForm.get('priority')?.value;
    const category = this.ticketSearchForm.get('category')?.value;

    if (status) {
      filters.status = status;
    }

    if (priority) {
      filters.priority = priority;
    }

    if (category) {
      filters.category = category;
    }

    this.ticketService.getTickets(filters).subscribe((res: any) => {
      this.ticketsData = res.tickets;
      if (this.currentPage === 0) {
        this.currentPage = res.tickets.length;
      }
      this.totalTicketsData = res.total;
    });
  }

  applyFilters() { }

  applySort($event: any) { }

}
