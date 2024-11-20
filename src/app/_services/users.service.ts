import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user, userRequest } from '../_models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  addUser(data: userRequest) {
    const URL = environment.ADD_USER;
    return this.http.post(URL, data);
  }
  getUsers() {
    const URL = environment.GET_ALL_USERS;
    return this.http.get<user[]>(URL);
  }
}
