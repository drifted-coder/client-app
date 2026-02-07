import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';

const routes: Routes = [{ path: '', component: TicketListComponent },
{ path: 'create', component: CreateTicketComponent },
{ path: ':id', component: TicketDetailComponent }, { path: '', component: TicketsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
