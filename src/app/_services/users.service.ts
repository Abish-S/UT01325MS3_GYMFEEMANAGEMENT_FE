import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  currentUserResponse,
  user,
  userRequest,
  userResponse,
  userUpdateRequest,
} from '../_models/user';
import { environment } from '../../environments/environment';
import { memberReport } from '../_models/memberReport';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  addUser(data: userRequest) {
    const URL = environment.ADD_USER;
    return this.http.post<userResponse>(URL, data);
  }
  updateUser(data: userUpdateRequest) {
    const URL = environment.UPDATE_USER + data.memberId;
    return this.http.put<userResponse>(URL, data);
  }
  getUsers() {
    const URL = environment.GET_ALL_USERS;
    return this.http.get<user[]>(URL);
  }

  deleteUser(id: string) {
    const URL = environment.DELETE_USER + id;
    return this.http.delete(URL);
  }
  getMemeberReports() {
    const URL = environment.GET_MEMBER_REPORT;
    return this.http.get<memberReport>(URL);
  }

  getCurrentUser() {
    const URL = environment.GET_CURRENT_USER;
    return this.http.get<currentUserResponse>(URL);
  }
}
