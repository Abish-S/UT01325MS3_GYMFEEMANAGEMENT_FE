import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsersService } from '../../../../_services/users.service';
import { user } from '../../../../_models/user';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrl: './make-payment.component.sass',
})
export class MakePaymentComponent {
  formGroup!: FormGroup;
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
  constructor(private userService: UsersService) {}
  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.userList = res;
      },
    });
  }
}
