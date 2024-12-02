import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../../../_services/users.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { MyValidators } from '../../../../_validators/custom-validator';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProgramsService } from '../../../../_services/programs.service';
import { trainingProgram } from '../../../../_models/trainingProgram';
import { user } from '../../../../_models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.sass',
})
export class AddUserComponent {
  formGroup!: FormGroup;
  loading = false;
  user!: user;
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
    if (this.user) {
      this.formGroup.patchValue({
        fullName: this.user.fullName,
        nic: this.user.nic,
        memberId: this.user.memberId,
        contactDetails: this.user.contactDetails,
        selectedTrainingProgramIds: this.user.selectedTrainingPrograms.map(
          (x) => x.trainingProgramId
        ),
      });
      this.formGroup.get('nic')?.disable();
      this.formGroup.get('password')?.setValidators([]);
      this.formGroup.get('password')?.updateValueAndValidity();
    }
  }
  initForm() {
    this.formGroup = this.fb.group({
      memberId: [],
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
      if (this.user) {
        this.userService.updateUser(this.formGroup.value).subscribe({
          next: (res) => {
            this.loading = false;
            this.notification.success('Success', res.message);
            this.modalRef.close();
          },
          error: () => {
            this.loading = false;
          },
        });
      } else {
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
}
