import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
    baseUrl: string = 'http://localhost:8000/api/';
    headers:HttpHeaders; 

    constructor(private http: HttpClient,private router:Router,private authService:AuthService) { }

      
// addQuote(content: string) {
//     const body = JSON.stringify({content: content});
//     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':  "Bearer " + this.authService.getToken() });
//     return this.http.post( this.baseUrl + 'quote', body, {headers: headers})
//   }

  get(): Observable<any> {
    this.headers= new HttpHeaders({'Authorization':  "Bearer " + this.authService.getToken() });
    return this.http.get<any>( this.baseUrl + 'tasks', {headers: this.headers} )
    .pipe(
        catchError(this.handleError)
    );

  }

  show(id:number){
    this.headers= new HttpHeaders({'Authorization':  "Bearer " + this.authService.getToken() });
    return this.http.get<any>( this.baseUrl + 'tasks/' + id,{headers: this.headers})
    .pipe(
        map((data)=>{return data}),
        catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        const errMessage = error.error.message;
        return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'server error');
  }

  store(data:any){
    //   const headers=new HttpHeaders().set('Content-Type','application/json');
      this.headers= new HttpHeaders({'Authorization':  "Bearer " + this.authService.getToken(),'Content-Type':'application/json' });

     return this.http.post(this.baseUrl+'tasks',data,{headers:this.headers})
      .pipe(
          tap(data=>console.log(data)),
          catchError((err)=>this.handleError(err))
      )
  }

  search(text:string){

  }
}
