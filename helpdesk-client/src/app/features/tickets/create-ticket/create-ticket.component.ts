import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../../../core/services/ticket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.scss'
})
export class CreateTicketComponent implements OnInit {
  ticketForm!: FormGroup

  constructor(private fb: FormBuilder, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.setTicketForm();
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

    this.ticketService.create(payload).subscribe({
      next: (res) => {
        if(res) {
          alert("Ticket Created Successfully")
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
