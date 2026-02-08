import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TicketService } from '../../../core/services/ticket.service';
import { Ticket } from '../../../core/models/ticket.model.ts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityService } from '../../../core/services/activity.service';
import { jwtDecoderFunc } from '../../../utils/jwtDecoder';
import { forkJoin } from 'rxjs';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss',
})
export class TicketListComponent implements OnInit {
  ticketsData: any[] = [];
  filteredTickets: any[] = [];
  paginatedTickets: any[] = [];
  ticketSearchForm!: FormGroup;

  statusList = [
    'Open',
    'In Progress',
    'Waiting for User',
    'Closed',
    'Resolved',
  ];
  priorityList = ['Low', 'Medium', 'High', 'Urgent'];
  categoryList = ['Bug', 'Billing', 'Feature Request', 'Other'];

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalTicketsData = 0;
  selectedTicket: any;
  activityData: any = [];
  commentsData: any = [];
  ticketForm!: FormGroup;
  commentForm!: FormGroup;
  tokenData: any;
  ticketId!: string;
  commentsList: any[] = [];
  userList: any = [];
  userDetails: any;

  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(
    private ticketService: TicketService,
    private fb: FormBuilder,
    private activityService: ActivityService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    let token = localStorage.getItem('accessToken');
    this.tokenData = jwtDecoderFunc(token);
    this.setTicketForm();
    this.ticketSearchForm = this.fb.group({
      search: [''],
      status: [''],
      priority: [''],
      category: [''],
    });
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
    });
    this.loadTickets();
    this.getUsersList();
  }

  loadTickets(currentPage: number = 1) {
    const filters: any = {
      page: currentPage,
      limit: this.pageSize,
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

  applyFilters() {}

  applySort($event: any) {}

  viewDetails = (data: any) => {
    this.selectedTicket = data;
    this.getActivityLogs(data._id);
    this.getComments(data._id);
  };

  editDetails = (data: any) => {
    debugger;
    this.userDetails = data;
    this.setTicketDetails();
    this.ticketId = data._id;
    this.ticketForm.patchValue({
      title: data.title,
      description: data.description,
      category: data.category,
      priority: data.priority,
      status: data.status,
    });
  };

  setTicketDetails = () => {
    const token = localStorage.getItem('accessToken');
    this.tokenData = jwtDecoderFunc(token);

    if (this.tokenData?.role == 'admin') {
      this.ticketForm.get('priority')?.enable();
      this.ticketForm.get('category')?.enable();
    }
    if (this.tokenData?.role == 'agent') {
      this.ticketForm.get('priority')?.enable();
      this.ticketForm.get('category')?.disable();
      this.ticketForm.get('title')?.disable();
      this.ticketForm.get('description')?.disable();
    } else {
      this.ticketForm.get('priority')?.disable();
      this.ticketForm.get('category')?.disable();
    }
  };

  getActivityLogs = (ticketId: string) => {
    this.activityService.getActivityDetails(ticketId).subscribe({
      next: (res) => {
        this.activityData = res;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  getComments = (ticketId: string) => {
    this.ticketService.getComments(ticketId).subscribe({
      next: (res) => {
        this.commentsData = res;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  setTicketForm = () => {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      status: [''],
      assign: [''],
    });
  };

  submit = () => {
    debugger
    var assign;
    if(this.ticketForm.get('assign')?.value == 'Self'){
      assign = this.tokenData.id
    }
    else{
      assign = this.ticketForm.get('assign')?.value
    }
    let payload = {
      title: this.ticketForm.get('title')?.value,
      description: this.ticketForm.get('description')?.value,
      category: this.ticketForm.get('category')?.value,
      priority: this.ticketForm.get('priority')?.value,
      status: this.ticketForm.get('status')?.value,
      assignedTo: assign
    };

    this.ticketService.update(this.ticketId, payload).subscribe({
      next: (res) => {
        if (res) {
          alert('Ticket Updated Successfully');
          this.closeModal.nativeElement.click();
          this.ticketForm.reset();
          this.loadTickets();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  resetForm = () => {
    this.ticketForm.reset();
  };

  resetSearchForm = () => {
    this.ticketSearchForm.reset();
    const filters: any = {
      page: 1,
      limit: this.pageSize,
    };

    this.ticketService.getTickets(filters).subscribe((res: any) => {
      this.ticketsData = res.tickets;
      if (this.currentPage === 0) {
        this.currentPage = res.tickets.length;
      }
      this.totalTicketsData = res.total;
    });
  };

  // submit comment
  submitComment = () => {
    const message = this.commentForm.get('comment')?.value;

    this.ticketService.addComment(this.ticketId, message).subscribe({
      next: (res) => {
        if (res) alert('Comments added successfully');
        this.commentForm.reset();
        this.getCommentsList(this.userDetails);
      },
      error: (error) => {
        alert('Failed to add comment');
      },
    });
  };

  // get comments list
  getCommentsList = (data: any) => {
    this.userDetails = data;
    this.ticketId = data._id;
    this.ticketService.getComments(data._id).subscribe({
      next: (res) => {
        this.commentsList = res;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  getUsersList = () => {
    debugger
    this.userService.getUsers().subscribe({
      next: (res: any) => {
        this.userList = res.filter((data: any) => data.role == 'agent');
      },
      error: (error) => {
        console.log(error);
      },
    });
  };
}
