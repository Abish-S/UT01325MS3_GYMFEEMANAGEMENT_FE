import { Component } from '@angular/core';
import { user } from '../../../../_models/user';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddUserComponent } from '../add-user/add-user.component';
import { UsersService } from '../../../../_services/users.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.sass',
})
export class UserComponent {
  listOfData: user[] = [];
  constructor(
    private modalService: NzModalService,
    private userService: UsersService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }
  openAddUser() {
    const modal = this.modalService.create({
      nzTitle: 'Add New User',
      nzContent: AddUserComponent,
      nzFooter: null,
      nzCentered: true,
    });
    modal.afterClose.subscribe((res) => {
      this.getAllUsers();
    });
  }

  getAllUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.listOfData = res;
      },
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.notification.success('Deleted', 'User deleted Success');
        this.getAllUsers();
      },
    });
  }
}
