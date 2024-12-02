import { Component } from '@angular/core';
import { user } from '../../../../_models/user';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddUserComponent } from '../add-user/add-user.component';
import { UsersService } from '../../../../_services/users.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataService } from '../../../../_services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.sass',
})
export class UserComponent {
  listOfData: user[] = [];
  defaultData: user[] = [];
  search = '';
  constructor(
    private modalService: NzModalService,
    private userService: UsersService,
    private notification: NzNotificationService,
    protected dataService: DataService
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
      nzWidth: 700,
    });
    modal.afterClose.subscribe((res) => {
      this.getAllUsers();
    });
  }
  openEditUser(data: user) {
    const modal = this.modalService.create({
      nzTitle: 'Edit User',
      nzContent: AddUserComponent,
      nzFooter: null,
      nzCentered: true,
      nzWidth: 700,
    });
    modal.componentInstance!.user = data;
    modal.afterClose.subscribe((res) => {
      this.getAllUsers();
    });
  }
  getFilteredData(event: any) {
    this.listOfData = this.defaultData.filter(
      (x) =>
        x.fullName.toLowerCase().includes(event.toLowerCase()) ||
        x.contactDetails.includes(event) ||
        x.nic.includes(event)
    );
  }
  getAllUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.listOfData = res;
        this.defaultData = res;
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
