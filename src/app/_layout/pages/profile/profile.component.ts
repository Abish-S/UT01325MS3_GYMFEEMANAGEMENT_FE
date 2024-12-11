import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { trainingProgram } from '../../../_models/trainingProgram';
import { UsersService } from '../../../_services/users.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProgramsService } from '../../../_services/programs.service';
import { MyValidators } from '../../../_validators/custom-validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass',
})
export class ProfileComponent {
  formGroup!: FormGroup;
  loading = false;
  programList: trainingProgram[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private notification: NzNotificationService,
    private programService: ProgramsService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getCurrentUser();
  }
  getCurrentUser() {
    this.userService.getCurrentUser().subscribe({
      next: (res) => {
        if (res) {
          this.formGroup.patchValue({
            fullName: res.data.fullName,
            nic: res.data.nic,
            memberId: res.data.memberId,
            contactDetails: res.data.contactDetails,
            selectedTrainingProgramIds: res.data.memberTrainingPrograms.map(
              (x) => x.trainingProgramId
            ),
          });
          this.formGroup.get('nic')?.disable();
        }
      },
    });
  }
  initForm() {
    this.formGroup = this.fb.group({
      memberId: [],
      fullName: ['', [MyValidators.customRequired('Full Name')]],
      nic: ['', [MyValidators.customRequired('NIC')]],
      password: [null, [MyValidators.customRequired('Password')]],
      contactDetails: ['', [MyValidators.customRequired('Contact No')]],
      selectedTrainingProgramIds: [null],
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
    console.log(this.formGroup);

    if (this.formGroup.invalid) {
      this.validate();
      return;
    } else {
      this.loading = true;

      this.userService.updateUser(this.formGroup.value).subscribe({
        next: (res) => {
          this.loading = false;
          this.notification.success('Success', res.message);
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }
}
