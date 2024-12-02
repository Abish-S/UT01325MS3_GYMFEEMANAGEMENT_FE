import { Injectable } from '@angular/core';
const TOKEN = 'ACCESS_TOKEN';
const ROLE = 'ROLE';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(token: string) {
    localStorage.setItem(TOKEN, token);
  }
  getToken(): string {
    return JSON.stringify(localStorage.getItem(TOKEN));
  }

  saveRole(role: boolean) {
    localStorage.setItem(ROLE, JSON.stringify(role));
  }

  getRole() {
    return JSON.parse(localStorage.getItem(ROLE)!);
  }
}
