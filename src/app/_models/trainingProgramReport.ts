export interface trainingProgramReport {
  success: boolean;
  message: string;
  data: trainingProgramData[];
}
export interface trainingProgramData {
  trainingProgramId: string;
  programName: string;
  description: string;
  price: number;
  totalMembers: number;
  enrolledMembers: {
    memberId: number;
    fullName: string;
    contactDetails: string;
  }[];
}
