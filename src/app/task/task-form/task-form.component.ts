import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl,FormArray ,Validators } from "@angular/forms";
import * as moment from 'moment-timezone';
import { TaskService } from 'src/app/core/task.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})

export class TaskFormComponent implements OnInit {

    taskForm: FormGroup ;

  constructor(private fb: FormBuilder , private taskService:TaskService) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
        description: ['', Validators.required],
        created_at: ['',Validators.required],
        deadline: ['',Validators.required],
        end_flag: ['0',Validators.required],
        categories: this.fb.array([
            this.fb.group({
                name:['',Validators.required],
                color:['',Validators.required]
            })
        ]),
        subTasks: this.fb.array([
            this.fb.group({
                content:['',Validators.required]
            })
        ])

      });

     console.log(this.taskForm.controls.value) 
  }


  get categories() :FormArray
  {
      return this.taskForm.get('categories') as FormArray;
  }

  get subTasks() :FormArray
  {
      return this.taskForm.get('subTasks') as FormArray;
  }
  


  newCategory(): FormGroup {
    return this.fb.group({
        name:[''],
        color:['']
    })
  }

  newSubTask(): FormGroup {
    return  this.fb.group({
        content:['',Validators.required]
    })
  }

  addSubTask(){
    this.subTasks.push(this.newSubTask())
  }

  addCategory(){
    this.categories.push( this.newCategory() )
  }

  removeCategory(i:number){
    this.categories.removeAt(i);
  }
  removeSubTask(i:number){
    this.subTasks.removeAt(i);
  }

  submit(){
      if(this.taskForm.valid)
      {
          //timezone form client-side was  2hour late
          this.taskForm.value.created_at = moment.tz(this.taskForm.value.created_at, "Asia/Damascus").format();
          //format date for deadline
          this.taskForm.value.deadline=moment(this.taskForm.value.deadline).format('YYYY/MM/DD'); 
          this.taskService.store(this.taskForm.value).subscribe(data=>console.log(data));
      }
  }


}
