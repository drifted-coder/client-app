import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  stats: any[] = [];

  constructor(private dashboardService: DashboardService){}

  ngOnInit() {
    this.getDashboardData();
  }

  getDashboardData = () => {
    this.dashboardService.getDashboardData().subscribe({
      next:(res) => {
        this.stats = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
