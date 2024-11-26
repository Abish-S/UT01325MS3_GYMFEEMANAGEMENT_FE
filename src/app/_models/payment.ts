export interface paymentRequest {
  memberId: number;
  amount: number;
  paymentType: number;
  paymentDate: Date;
}
export interface getAllPaymentResponse {
  paymentId: number;
  memberId: number;
  amount: number;
  memberFullName: string;
  paymentType: number;
  paymentDate: Date;
  dueDate: Date;
}
