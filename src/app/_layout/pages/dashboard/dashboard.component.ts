import { Component } from '@angular/core';
import { AlertService } from '../../../_services/alert.service';
import { alert } from '../../../_models/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass',
})
export class DashboardComponent {
  isCollapsed = false;
  alerts: alert[] = [];
  constructor(private alertService: AlertService, private router: Router) {}
  ngOnInit() {
    this.getAllAlerts();
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
