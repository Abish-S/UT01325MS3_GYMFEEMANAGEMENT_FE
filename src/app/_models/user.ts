export interface user {
  memberId: string;
  fullName: string;
  nic: string;
  contactDetails: string;
  registrationDate: Date;
  selectedTrainingPrograms: programs[];
}
export interface userRequest {
  fullName: string;
  nic: string;
  contactDetails: string;
}

export interface userResponse {
  message: string;
}
export interface programs {
  trainingProgramId: number;
  programName: string;
  description: string;
  price: number;
}
