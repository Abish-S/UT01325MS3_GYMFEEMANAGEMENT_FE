import { Component } from '@angular/core';
import { ProgramsService } from '../../../../_services/programs.service';
import { trainingProgramData } from '../../../../_models/trainingProgramReport';

@Component({
  selector: 'app-training-report',
  templateUrl: './training-report.component.html',
  styleUrl: './training-report.component.sass',
})
export class TrainingReportComponent {
  listOfData: trainingProgramData[] = [];
  constructor(private programService: ProgramsService) {}
  ngOnInit() {
    this.getAllTrainingReport();
  }
  getAllTrainingReport() {
    this.programService.getTrainingProgramReport().subscribe({
      next: (res) => {
        if (res) {
          this.listOfData = res.data;
        }
      },
    });
  }
}
