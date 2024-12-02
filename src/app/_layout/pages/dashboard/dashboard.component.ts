import { Component } from '@angular/core';
import { AlertService } from '../../../_services/alert.service';
import { alert } from '../../../_models/alert';
import { Router } from '@angular/router';
import { CommonService } from '../../../_services/common.service';
import { DataService } from '../../../_services/data.service';
import { TokenService } from '../../../_services/token.service';
import { UsersService } from '../../../_services/users.service';
import { currentUser } from '../../../_models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass',
})
export class DashboardComponent {
  isCollapsed = false;
  alerts: alert[] = [];
  currentUser!: currentUser | null;
  constructor(
    private alertService: AlertService,
    private router: Router,
    protected dataService: DataService,
    private tokenService: TokenService,
    private userService: UsersService
  ) {}
  ngOnInit() {
    this.getAllAlerts();
    this.dataService.isAdmin = this.tokenService.getRole();
    this.getCurrentUser();
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

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe({
      next: (res) => {
        if (res) this.currentUser = res.data;
      },
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
