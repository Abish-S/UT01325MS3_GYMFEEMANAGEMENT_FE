import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../../../_services/users.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { MyValidators } from '../../../../_validators/custom-validator';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.sass',
})
export class AddUserComponent {
  formGroup!: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private modalRef: NzModalRef,
    private notification: NzNotificationService
  ) {
    this.initForm();
  }

  ngOnInit() {}
  initForm() {
    this.formGroup = this.fb.group({
      fullName: ['', [MyValidators.customRequired('Full Name')]],
      nic: ['', [MyValidators.customRequired('NIC')]],
      contactDetails: ['', [MyValidators.customRequired('Contact No')]],
    });
  }

  validate() {
    Object.values(this.formGroup.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  submit() {
    if (this.formGroup.invalid) {
      this.validate();
      return;
    } else {
      this.loading = true;
      this.userService.addUser(this.formGroup.value).subscribe({
        next: (res) => {
          this.loading = false;
          this.notification.success('Success', 'User saved successfully');
          this.modalRef.close();
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }
}