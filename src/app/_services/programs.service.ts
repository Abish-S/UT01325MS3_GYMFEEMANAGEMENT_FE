import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  trainingProgram,
  trainingProgramRequest,
} from '../_models/trainingProgram';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  constructor(private http: HttpClient) {}
  getAllTrainingPrograms() {
    const URL = environment.GET_ALL_TRAINING_PROGRAMS;
    return this.http.get<trainingProgram[]>(URL);
  }
  save(data: trainingProgramRequest) {
    const URL = environment.SAVE_TRAINING_PROGRAM;
    return this.http.post(URL, data);
  }
}
