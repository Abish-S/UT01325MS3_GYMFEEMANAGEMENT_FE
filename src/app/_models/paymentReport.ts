export interface paymentReport {
  success: boolean;
  message: string;
  data: paymentReportData[];
}
export interface paymentReportData {
  paymentId: number;
  memberId: number;
  memberFullName: string;
  memberContact: string;
  paymentType: number;
  amount: number;
  paymentDate: Date;
  dueDate: Date;
  isOverdue: boolean;
}
