import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {TaskService} from '../../core/task.service';



@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {
    tasks$: Observable<any>;


  constructor(private taskService:TaskService,private router:Router) { }

  ngOnInit(): void {
    this.tasks$=this.taskService.getQuotes()
  }

 

}
