export interface memberReport {
  success: boolean;
  message: string;
  data: memberReportData[];
}
export interface memberReportData {
  memberId: number;
  fullName: string;
  nic: string;
  contactDetails: string;
  trainingPrograms: string[];
  totalPaid: number;
  lastPaymentDate: Date;
  nextDueDate: Date;
}
