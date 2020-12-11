import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {TaskService} from '../../core/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {

    tasks:MatTableDataSource<any>;
    columns:string[]=[
        'id',
        'description',
        'deadline',
        'end_flag',
        'categories'];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    searchKey: string;
  constructor(private taskService:TaskService,private router:Router) { }


  ngOnInit(): void {
    
    this.taskService.get()
    .subscribe(
        (data)=>{

            this.tasks = new MatTableDataSource(data);
            this.tasks.sort = this.sort;
            this.tasks.paginator = this.paginator;
            console.log(this.tasks)
            this.tasks.filterPredicate = (data, filter) => {
              return this.columns.some(ele => {
                //   console.log(ele)
                //   console.log(data[ele])
                  if(ele!="categories")
                    return  data[ele].toString().toLowerCase().indexOf(filter) != -1;
                else{
                    // console.log("else",ele)
                    return  data[ele].some((cat:any)=>
                    {
                        // console.log("else",cat.color)
                            return cat.color.toLowerCase().indexOf(filter) > -1 ||
                                cat.name.toLowerCase().indexOf(filter) > -1 ;
                        })
                }
              });
            };
        }
    )

  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.tasks.filter = this.searchKey.trim().toLowerCase();
  }
 

}
