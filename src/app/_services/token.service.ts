import { Injectable } from '@angular/core';
const TOKEN = 'ACCESS_TOKEN';
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
}
