import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
        'categories',
        'actions'];
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
                  if(ele!="categories" && ele!="actions")
                    return  data[ele].toString().toLowerCase().indexOf(filter) != -1;
                else if(ele!="actions"){
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

  details(id:number){
      this.router.navigate(['/tasks/show',id]);
  }
 

}
