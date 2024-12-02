import { Component } from '@angular/core';
import { AlertService } from '../../../_services/alert.service';
import { alert } from '../../../_models/alert';
import { Router } from '@angular/router';
import { CommonService } from '../../../_services/common.service';
import { DataService } from '../../../_services/data.service';
import { TokenService } from '../../../_services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass',
})
export class DashboardComponent {
  isCollapsed = false;
  alerts: alert[] = [];
  constructor(
    private alertService: AlertService,
    private router: Router,
    protected dataService: DataService,
    private tokenService: TokenService
  ) {}
  ngOnInit() {
    this.getAllAlerts();
    this.dataService.isAdmin = this.tokenService.getRole();
  }
  getAllAlerts() {
    this.alertService.getAllAlerts().subscribe({
      next: (res) => {
        if (res) {
          this.alerts = res.data;
        }
      },
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
