import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  recentTickets: any[] = [];
  statCounts: any[] = [];

  constructor(private dashboardService: DashboardService){}

  ngOnInit() {
    this.getDashboardData();
  }

  getDashboardData = () => {
    this.dashboardService.getDashboardData().subscribe({
      next:(res) => {
        this.recentTickets = res.recentTickets;
        this.statCounts = res.statusCounts;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
