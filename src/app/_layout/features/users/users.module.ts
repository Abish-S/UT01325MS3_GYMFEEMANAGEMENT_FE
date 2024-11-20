import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user/user.component';
import { SharedModule } from '../../../shared/shared.module';
import { AddUserComponent } from './add-user/add-user.component';

@NgModule({
  declarations: [UserComponent, AddUserComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}
