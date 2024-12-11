import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProgramsService } from '../../../../_services/programs.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { MyValidators } from '../../../../_validators/custom-validator';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { trainingProgram } from '../../../../_models/trainingProgram';

@Component({
  selector: 'app-add-new-program',
  templateUrl: './add-new-program.component.html',
  styleUrl: './add-new-program.component.sass',
})
export class AddNewProgramComponent {
  formGroup!: FormGroup;
  loading = false;
  loadingImg = false;
  avatarUrl?: string;
  trainingProgram!: trainingProgram;
  constructor(
    private fb: FormBuilder,
    private programService: ProgramsService,
    private modalRef: NzModalRef,
    private notification: NzNotificationService,
    private messageService: NzMessageService
  ) {
    this.initForm();
  }

  ngOnInit() {
    if (this.trainingProgram) {
      this.formGroup.patchValue({
        id: this.trainingProgram.trainingProgramId,
        programName: this.trainingProgram.programName,
        description: this.trainingProgram.description,
        price: this.trainingProgram.price,
        base64Image: this.trainingProgram.imagePath,
      });
      this.avatarUrl = this.trainingProgram.imagePath;
    }
  }
  initForm() {
    this.formGroup = this.fb.group({
      id: [],
      programName: ['', [MyValidators.customRequired('Program Name')]],
      description: ['', [MyValidators.customRequired('Description')]],
      price: ['', [MyValidators.customRequired('Price')]],
      base64Image: [''],
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
      if (this.trainingProgram) {
        this.update();
      } else {
        this.save();
      }
    }
  }

  update() {
    this.programService.update(this.formGroup.value).subscribe({
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

  save() {
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
  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.messageService.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.messageService.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loadingImg = true;
        break;
      case 'done':
      // Get this url from response in real world.

      case 'error':
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loadingImg = false;
          this.avatarUrl = img;
          this.formGroup.get('base64Image')?.setValue(img);
        });
        break;
    }
  }
}
