import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramsComponent } from './programs/programs.component';
import { SharedModule } from '../../../shared/shared.module';
import { AddNewProgramComponent } from './add-new-program/add-new-program.component';

@NgModule({
  declarations: [ProgramsComponent, AddNewProgramComponent],
  imports: [CommonModule, ProgramsRoutingModule, SharedModule],
})
export class ProgramsModule {}
