import { Component } from '@angular/core';
import { trainingProgram } from '../../../../_models/trainingProgram';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProgramsService } from '../../../../_services/programs.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AddNewProgramComponent } from '../add-new-program/add-new-program.component';
import { DataService } from '../../../../_services/data.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.sass',
})
export class ProgramsComponent {
  listOfData: trainingProgram[] = [];
  defaultData: trainingProgram[] = [];
  search = '';
  constructor(
    private modalService: NzModalService,
    private programService: ProgramsService,
    private notification: NzNotificationService,
    protected dataService: DataService
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
  getFilteredData(event: any) {
    this.listOfData = this.defaultData.filter((x) =>
      x.programName.toLowerCase().includes(event.toLowerCase())
    );
  }
  getAllProgram() {
    this.programService.getAllTrainingPrograms().subscribe({
      next: (res) => {
        this.listOfData = res;
        this.defaultData = res;
      },
    });
  }
}
