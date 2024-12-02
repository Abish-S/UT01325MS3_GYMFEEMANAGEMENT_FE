import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { loginRequest, loginResponse } from '../_models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: loginRequest) {
    const URL = environment.LOGIN;
    return this.http.post<loginResponse>(URL, data);
  }
}
