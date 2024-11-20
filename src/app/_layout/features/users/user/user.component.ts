import { Component } from '@angular/core';
import { user } from '../../../../_models/user';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddUserComponent } from '../add-user/add-user.component';
import { UsersService } from '../../../../_services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.sass',
})
export class UserComponent {
  listOfData: user[] = [];
  constructor(
    private modalService: NzModalService,
    private userService: UsersService
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
}
