import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import {CoreModule} from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

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
