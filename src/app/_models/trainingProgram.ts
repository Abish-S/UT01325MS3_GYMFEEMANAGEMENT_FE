export interface trainingProgram {
  trainingProgramId: number;
  programName: string;
  description: string;
  price: number;
}
export interface trainingProgramRequest {
  programName: string;
  description: string;
  price: number;
  selectedTrainingProgramIds: number[];
  payment: {
    amount: number;
    paymentType: number;
  };
}
