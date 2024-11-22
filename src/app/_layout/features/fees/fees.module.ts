import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeesRoutingModule } from './fees-routing.module';
import { FeesComponent } from './fees/fees.component';
import { SharedModule } from '../../../shared/shared.module';
import { MakePaymentComponent } from './make-payment/make-payment.component';

@NgModule({
  declarations: [FeesComponent, MakePaymentComponent],
  imports: [CommonModule, FeesRoutingModule, SharedModule],
})
export class FeesModule {}
