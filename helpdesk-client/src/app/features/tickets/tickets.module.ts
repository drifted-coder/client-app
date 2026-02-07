import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { ɵInternalFormsSharedModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    TicketsComponent,
    TicketListComponent,
    TicketDetailComponent,
    CreateTicketComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    NgxPaginationModule
]
})
export class TicketsModule { }
