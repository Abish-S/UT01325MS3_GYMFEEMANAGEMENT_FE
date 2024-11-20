import { Component } from '@angular/core';
import { trainingProgram } from '../../../../_models/trainingProgram';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProgramsService } from '../../../../_services/programs.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AddNewProgramComponent } from '../add-new-program/add-new-program.component';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.sass',
})
export class ProgramsComponent {
  listOfData: trainingProgram[] = [];
  constructor(
    private modalService: NzModalService,
    private programService: ProgramsService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.getAllProgram();
  }
  openAddProgram() {
    const modal = this.modalService.create({
      nzTitle: 'Add New Program',
      nzContent: AddNewProgramComponent,
      nzFooter: null,
      nzCentered: true,
    });
    modal.afterClose.subscribe((res) => {
      this.getAllProgram();
    });
  }

  getAllProgram() {
    this.programService.getAllTrainingPrograms().subscribe({
      next: (res) => {
        this.listOfData = res;
      },
    });
  }
}
