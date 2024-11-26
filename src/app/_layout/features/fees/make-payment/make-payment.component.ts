import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../../../_services/users.service';
import { user } from '../../../../_models/user';
import { PaymentService } from '../../../../_services/payment.service';
import { MyValidators } from '../../../../_validators/custom-validator';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrl: './make-payment.component.sass',
})
export class MakePaymentComponent {
  userList: user[] = [];
  feeTypes = [
    {
      value: 2,
      label: 'Monthly',
    },
    {
      value: 3,
      label: 'Annual',
    },
  ];
  formGroup!: FormGroup;
  constructor(
    private userService: UsersService,
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private modalRef: NzModalRef
  ) {}
  ngOnInit() {
    this.initForm();
    this.getAllUsers();
  }

  initForm() {
    this.formGroup = this.fb.group({
      memberId: [null, [MyValidators.customRequired('Member')]],
      // "amount": [0,[[MyValidators.customRequired('Amount')]]],
      paymentType: [2, { nonNullable: true }],
      paymentDate: [
        new Date(),
        { nonNullable: true },
        [MyValidators.customRequired('Payment Date')],
      ],
    });
  }
  getAllUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.userList = res;
      },
    });
  }

  makePayment() {
    this.paymentService.makePaymennt(this.formGroup.value).subscribe({
      next: (res) => {
        this.modalRef.close();
      },
    });
  }
}
