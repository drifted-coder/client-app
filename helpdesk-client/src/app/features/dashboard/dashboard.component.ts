import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';
import { AuthService } from '../../core/services/auth.service';
import { take } from 'rxjs';
import { jwtDecoderFunc } from '../../utils/jwtDecoder';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  recentTickets: any[] = [];
  assignedTickets: any[] = [];
  statCounts: any[] = [];
  lastSevenDaysCount: number=0;;
  tokenData: any;
  header!: string;

  constructor(private dashboardService: DashboardService, private authService: AuthService) { }

  ngOnInit() {
    let token = localStorage.getItem('accessToken');
    this.tokenData = jwtDecoderFunc(token);
    this.authService.token$
      .pipe(take(1))
      .subscribe(token => {
        if (token) {
          this.getDashboardData();
        }
      });
  }

  getDashboardData = () => {
    this.dashboardService.getDashboardData().subscribe({
      next: (res) => {
        debugger
        if(this.tokenData.role == 'user'){
          this.header = 'Recent'
          this.recentTickets = res.recentTickets.length;
          this.statCounts = res.statusCounts;
        }
        else{
          this.header = 'Assigned'
          this.assignedTickets = res.assignedTickets;
          this.statCounts = res.statusCounts;
          this.lastSevenDaysCount = res.last7Days;
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
