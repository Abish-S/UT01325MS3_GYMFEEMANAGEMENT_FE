import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MakePaymentComponent } from '../make-payment/make-payment.component';
import { PaymentService } from '../../../../_services/payment.service';
import { getAllPaymentResponse } from '../../../../_models/payment';
import { DataService } from '../../../../_services/data.service';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrl: './fees.component.sass',
})
export class FeesComponent {
  listOfData: getAllPaymentResponse[] = [];

  constructor(
    private modalService: NzModalService,
    private paymentService: PaymentService,
    protected dataService: DataService
  ) {}
  ngOnInit() {
    this.getAllPayments();
  }
  makePayment() {
    const modal = this.modalService.create({
      nzTitle: 'Make Payment',
      nzContent: MakePaymentComponent,
      nzFooter: null,
      nzCentered: true,
      nzWidth: 700,
    });
    modal.afterClose.subscribe((res) => {
      this.getAllPayments();
    });
  }

  getAllPayments() {
    this.paymentService.getAllPayments().subscribe({
      next: (res) => {
        this.listOfData = res;
      },
    });
  }
}
