export interface alertResponse {
  success: boolean;
  message: string;
  data: alert[];
}
export interface alert {
  alertId: number;
  memberId: number;
  memberFullName: string;
  message: string;
  createdAt: Date;
  isResolved: boolean;
}
