import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
    baseUrl: string = 'http://localhost:8000/api/';

    constructor(private http: HttpClient,private router:Router) { }

      
// addQuote(content: string) {
//     const body = JSON.stringify({content: content});
//     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':  "Bearer " + this.authService.getToken() });
//     return this.http.post( this.baseUrl + 'quote', body, {headers: headers})
//   }

  getQuotes(): Observable<any> {
    // const headers = new HttpHeaders({'Authorization':  "Bearer " + this.authService.getToken() });
    // return this.http.get<>( this.baseUrl + 'quotes',{headers: headers})
    return this.http.get<any>( this.baseUrl + 'tasks')
    .pipe(
        catchError(this.handleError)
    );

  }

  show(id:number){
    return this.http.get<any>( this.baseUrl + 'tasks/' + id)
    .pipe(
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
      const headers=new HttpHeaders().set('Content-Type','application/json');
     return this.http.post(this.baseUrl+'tasks',data,{headers:headers})
      .pipe(
          tap(data=>console.log(data)),
          catchError((err)=>this.handleError(err))
      )
  }
}
