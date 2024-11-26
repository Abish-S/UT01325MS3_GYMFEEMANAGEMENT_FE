import { Component } from '@angular/core';
import { PaymentService } from '../../../../_services/payment.service';
import { paymentReportData } from '../../../../_models/paymentReport';

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrl: './payment-report.component.sass',
})
export class PaymentReportComponent {
  listOfData: paymentReportData[] = [];
  constructor(private paymentService: PaymentService) {}
  ngOnInit() {
    this.getAllPaymentReportData();
  }
  getAllPaymentReportData() {
    this.paymentService.getAllPayemntReport().subscribe({
      next: (res) => {
        if (res) {
          this.listOfData = res.data;
        }
      },
    });
  }
}
