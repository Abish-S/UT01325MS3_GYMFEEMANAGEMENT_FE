import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { alertResponse } from '../_models/alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private http: HttpClient) {}

  getAllAlerts() {
    const URL = environment.GET_ALL_ALERTS;
    return this.http.get<alertResponse>(URL);
  }
}
