import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskFormComponent } from './task-form/task-form.component';
import { SharedModule } from '../shared/shared.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import {CoreModule} from '../core/core.module'

@NgModule({
  declarations: [TaskFormComponent, TaskListComponent, TaskDetailsComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class TaskModule { }
