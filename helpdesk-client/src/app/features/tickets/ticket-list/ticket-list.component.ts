import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TicketService } from '../../../core/services/ticket.service';
import { Ticket } from '../../../core/models/ticket.model.ts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityService } from '../../../core/services/activity.service';
import { jwtDecoderFunc } from '../../../utils/jwtDecoder';
import { forkJoin } from 'rxjs';

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
  selectedTicket: any;
  activityData: any = [];
  commentsData: any = [];
  ticketForm!: FormGroup
  tokenData: any;
  ticketId!: string;

  @ViewChild('closeModal') closeModal!: ElementRef

  constructor(private ticketService: TicketService, private fb: FormBuilder, private activityService: ActivityService) { }

  ngOnInit(): void {
    this.setTicketForm();
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

  viewDetails = (data: any) => {
    this.selectedTicket = data
    this.getActivityLogs(data._id);
    this.getComments(data._id);
  }

  editDetails = (data: any) => {
    debugger
    this.setTicketDetails();
    this.ticketId = data._id;
    this.ticketForm.patchValue({
      title: data.title,
      description: data.description,
      category: data.category,
      priority: data.priority
    })
  }

  setTicketDetails = () => {
    const token = localStorage.getItem('accessToken')
    this.tokenData = jwtDecoderFunc(token)

    if(this.tokenData?.role == 'agent' || this.tokenData?.role == 'admin'){
      this.ticketForm.get('priority')?.enable()
      this.ticketForm.get('category')?.enable()
    }
    else{
      this.ticketForm.get('priority')?.disable()
      this.ticketForm.get('category')?.disable()
    }
  }

  getActivityLogs = (ticketId: string) => {
    this.activityService.getActivityDetails(ticketId).subscribe({
      next: (res) => {
        this.activityData = res;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getComments = (ticketId: string) => {
    this.ticketService.getComments(ticketId).subscribe({
      next: (res) => {
        this.commentsData = res;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  setTicketForm = () => {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required]
    })
  }

  submit = () => {
    let payload = {
      "title": this.ticketForm.get('title')?.value,
      "description": this.ticketForm.get('description')?.value,
      "category": this.ticketForm.get('category')?.value,
      "priority": this.ticketForm.get('priority')?.value
    }

    this.ticketService.update(this.ticketId, payload).subscribe({
      next: (res) => {
        if(res) {
          alert("Ticket Updated Successfully")
          this.closeModal.nativeElement.click();
          this.ticketForm.reset();
          this.loadTickets();
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  resetForm = () => {
    this.ticketForm.reset();
  }
}
