import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportComponent } from './report/report.component';
import { MemberReportComponent } from './member-report/member-report.component';
import { SharedModule } from '../../../shared/shared.module';
import { PaymentReportComponent } from './payment-report/payment-report.component';
import { TrainingReportComponent } from './training-report/training-report.component';

@NgModule({
  declarations: [ReportComponent, MemberReportComponent, PaymentReportComponent, TrainingReportComponent],
  imports: [CommonModule, ReportsRoutingModule, SharedModule],
})
export class ReportsModule {}
