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
export interface userUpdateRequest {
  memberId: string;
  fullName: string;
  contactDetails: string;
  password: string;
  selectedTrainingProgramIds: number[];
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
export interface currentUserResponse {
  success: boolean;
  data: currentUser;
}

export interface currentUser {
  fullName: string;
  nic: string;
  contactDetails: string;
  registrationDate: Date;
  isAdmin: boolean;
}
