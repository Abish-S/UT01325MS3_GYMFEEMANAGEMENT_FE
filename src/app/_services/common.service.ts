import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private notification: NzNotificationService) {}

  catchError(error: any) {
    if (error.status === 400) {
      this.notification.error('', error.error.message);
    }
    return error;
  }
}
