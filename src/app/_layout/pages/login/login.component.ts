import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../_services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyValidators } from '../../../_validators/custom-validator';
import { TokenService } from '../../../_services/token.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  formGroup!: FormGroup;
  loading = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private token: TokenService,
    private notification: NzNotificationService
  ) {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      username: [null, [MyValidators.customRequired('Username')]],
      password: [null, [MyValidators.customRequired('Password')]],
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
  login() {
    if (this.formGroup.invalid) {
      this.validate();
      return;
    } else {
      this.loading = true;
      this.authService.login(this.formGroup.value).subscribe({
        next: (res) => {
          this.loading = false;
          this.token.saveToken(res.token);
          this.notification.success('Success', 'Login successfuly');
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.loading = false;
          this.notification.error('Error', 'Login Failed');
        },
      });
    }
  }
}
