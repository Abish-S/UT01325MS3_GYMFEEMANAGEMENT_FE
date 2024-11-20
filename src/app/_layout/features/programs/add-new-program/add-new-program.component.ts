import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProgramsService } from '../../../../_services/programs.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { MyValidators } from '../../../../_validators/custom-validator';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-add-new-program',
  templateUrl: './add-new-program.component.html',
  styleUrl: './add-new-program.component.sass',
})
export class AddNewProgramComponent {
  formGroup!: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private programService: ProgramsService,
    private modalRef: NzModalRef,
    private notification: NzNotificationService
  ) {
    this.initForm();
  }

  ngOnInit() {}
  initForm() {
    this.formGroup = this.fb.group({
      programName: ['', [MyValidators.customRequired('Program Name')]],
      description: ['', [MyValidators.customRequired('Description')]],
      price: ['', [MyValidators.customRequired('Price')]],
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
      this.programService.save(this.formGroup.value).subscribe({
        next: (res) => {
          this.loading = false;
          this.notification.success(
            'Success',
            'Training program saved successfully'
          );
          this.modalRef.close();
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }
}
