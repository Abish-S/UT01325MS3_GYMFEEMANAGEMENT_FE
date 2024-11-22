import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MakePaymentComponent } from '../make-payment/make-payment.component';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrl: './fees.component.sass',
})
export class FeesComponent {
  listOfData: any[] = [];
  constructor(private modalService: NzModalService) {}

  makePayment() {
    const modal = this.modalService.create({
      nzTitle: 'Make Payment',
      nzContent: MakePaymentComponent,
      nzFooter: null,
      nzCentered: true,
      nzWidth: 700,
    });
  }
}
