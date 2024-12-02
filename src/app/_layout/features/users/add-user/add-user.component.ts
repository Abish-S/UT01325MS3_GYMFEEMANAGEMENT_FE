import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../../../_services/users.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { MyValidators } from '../../../../_validators/custom-validator';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProgramsService } from '../../../../_services/programs.service';
import { trainingProgram } from '../../../../_models/trainingProgram';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.sass',
})
export class AddUserComponent {
  formGroup!: FormGroup;
  loading = false;
  programList: trainingProgram[] = [];

  feeTypes = [
    {
      value: 1,
      label: 'Registration',
    },
    {
      value: 2,
      label: 'Monthly',
    },
    {
      value: 3,
      label: 'Annual',
    },
  ];
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private modalRef: NzModalRef,
    private notification: NzNotificationService,
    private programService: ProgramsService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.getAllProgram();
  }
  initForm() {
    this.formGroup = this.fb.group({
      fullName: ['', [MyValidators.customRequired('Full Name')]],
      nic: ['', [MyValidators.customRequired('NIC')]],
      password: ['', [MyValidators.customRequired('Password')]],
      contactDetails: ['', [MyValidators.customRequired('Contact No')]],
      selectedTrainingProgramIds: [
        null,
        [MyValidators.customRequired('Training Programs')],
      ],
      payment: this.fb.group({
        amount: [5000],
        paymentType: [1, [MyValidators.customRequired('Fee Type')]],
        paymentDate: [new Date()],
      }),
    });
  }

  getAllProgram() {
    this.programService.getAllTrainingPrograms().subscribe({
      next: (res) => {
        this.programList = res;
      },
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
          this.notification.success('Success', res.message);
          this.modalRef.close();
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }
}
