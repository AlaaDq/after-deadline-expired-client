import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {TaskService} from '../../core/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  constructor(private taskService:TaskService,private route:ActivatedRoute) { }
    id:number;
  task:any  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.id=params['id']
       this.task= this.taskService.show(this.id).subscribe(data=>this.task=data);
    });
    
    

  }

}
