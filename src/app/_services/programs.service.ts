import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  trainingProgram,
  trainingProgramRequest,
} from '../_models/trainingProgram';
import { catchError } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  constructor(private http: HttpClient, private common: CommonService) {}
  getAllTrainingPrograms() {
    const URL = environment.GET_ALL_TRAINING_PROGRAMS;
    return this.http.get<trainingProgram[]>(URL);
  }
  save(data: trainingProgramRequest) {
    const URL = environment.SAVE_TRAINING_PROGRAM;
    return this.http.post(URL, data).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      })
    );
  }
}
