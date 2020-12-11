import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {TaskService} from '../../core/task.service';
import {ICategories, ISubTasks, ITaskDetails,ITask}from '../../shared/interfaces'
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  constructor(private taskService:TaskService,private route:ActivatedRoute) { }
    id:number;
    task:ITask;
    categories:ICategories[];
    subtasks:ISubTasks[];  
    ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.id=params['id']
        this.taskService.show(this.id)
       .subscribe(
           (data:ITaskDetails) => {
               console.log(data)
               this.categories=data.categories
               this.subtasks=data.sub_tasks;
               this.task={id:data.id,deadline:data.deadline,description:data.description,end_flag:data.end_flag,created_at:data.created_at,updated_at:data.updated_at};
            });
    });
    
    

  }

}
