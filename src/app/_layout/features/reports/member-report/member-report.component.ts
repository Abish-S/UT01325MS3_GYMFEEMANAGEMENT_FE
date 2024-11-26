import { Component } from '@angular/core';
import { UsersService } from '../../../../_services/users.service';
import { memberReportData } from '../../../../_models/memberReport';

@Component({
  selector: 'app-member-report',
  templateUrl: './member-report.component.html',
  styleUrl: './member-report.component.sass',
})
export class MemberReportComponent {
  listOfData: memberReportData[] = [];
  constructor(private userService: UsersService) {}
  ngOnInit() {
    this.getAllMemberReport();
  }
  getAllMemberReport() {
    this.userService.getMemeberReports().subscribe({
      next: (res) => {
        if (res) {
          this.listOfData = res.data;
        }
      },
    });
  }
}
