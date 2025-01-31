export interface trainingProgram {
  trainingProgramId: number;
  programName: string;
  description: string;
  imagePath: string;
  price: number;
}
export interface trainingProgramRequest {
  id?: string;
  programName: string;
  description: string;
  price: number;
  selectedTrainingProgramIds: number[];
  payment: {
    amount: number;
    paymentType: number;
  };
}
