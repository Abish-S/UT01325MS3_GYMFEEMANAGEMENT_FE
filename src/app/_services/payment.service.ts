import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getAllPaymentResponse, paymentRequest } from '../_models/payment';
import { environment } from '../../environments/environment';
import { paymentReport } from '../_models/paymentReport';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  makePaymennt(data: paymentRequest) {
    const URL = environment.MAKE_PAYMENT;
    return this.http.post(URL, data);
  }
  getAllPayments() {
    const URL = environment.GET_ALL_PAYMENTS;
    return this.http.get<getAllPaymentResponse[]>(URL);
  }

  getAllPayemntReport() {
    const URL = environment.GET_PAYMENT_REPORT;
    return this.http.get<paymentReport>(URL);
  }
}
