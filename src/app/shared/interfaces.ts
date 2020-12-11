
export interface IUser {
    id:number,
    email:string,
    name:string,
    updated_at:string,
    created_at:string
}

export interface IAuth {
    access_token:string,
    expires_at:string,
    status_code:number,
    success:string,
    token_type:string
    user:IUser    
}


export interface ITaskDetails{
    id:number,
    description:string,
    deadline:string,
    end_flag:boolean,
    created_at:string,
    updated_at:string,
  sub_tasks:ISubTasks[],
  categories:ICategories[]
}
export interface ITask{
    id:number,
    description:string,
    deadline:string,
    end_flag:boolean,
    created_at:string,
    updated_at:string,
}

export interface ISubTasks{
    id:number,
    content:string,
    task_id:number,
    created_at:string,
    updated_at:string,
}

export interface ICategories{
    id:number,
    name:string,
    color:string,
    created_at:string,
    updated_at:string,
    pivot:{task_id:number
           category_id:number
          },
}