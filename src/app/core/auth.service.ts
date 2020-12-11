import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

import { map, catchError,retry,tap } from 'rxjs/operators';

import { BehaviorSubject, Observable } from 'rxjs';
import {IAuth, IUser} from '../shared/interfaces';


export interface IAuthService {
    readonly authStatus$: BehaviorSubject<boolean>
    readonly user$: BehaviorSubject<IUser>
    signup(username: string, email: string, password: string,password_confirmation:string) 
    signin(email: string, password: string):Observable<any> 
    updateAuthStatus(state: boolean,user?:IUser): void
    getToken()
    setToken(accessToken:string)
    isAuth()

  }



const intialUser={
    id:undefined,
    email:undefined,
    name:undefined,
    updated_at:undefined,
    created_at:undefined 
}

@Injectable({
    providedIn: 'root'
  })

export class AuthService {

  baseUrl: string = 'http://localhost:8000/api/';
  readonly authStatus$ = new BehaviorSubject<boolean>(false);
  readonly user$ = new BehaviorSubject<IUser>(intialUser);

  constructor(private http: HttpClient) { }

  public updateAuthStatus(state: boolean,user?:IUser): void  {
          this.authStatus$.next(state);
          this.user$.next(user);
    }


    signup(username: string, email: string, password: string,password_confirmation:string) {
        return this.http.post<IAuth>(this.baseUrl + 'register',
          {name: username, email: email, password:password,password_confirmation:password_confirmation},
          {headers: new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'})})
          .pipe(
              tap((response:IAuth)=>{let currentState= response.access_token ? true:false;this.updateAuthStatus(currentState,response.user);}),
              tap((response:IAuth)=>{response.access_token ? this.setToken(response.access_token):undefined}),
              map((response:IAuth)=>{return response.access_token})
          );
      }

    signin(email:string,password:string){
        return this.http.post<any>(this.baseUrl + 'login',
        {email: email, password: password})
        .pipe(
            tap((response:IAuth)=>{let currentState= response.access_token ? true:false;this.updateAuthStatus(currentState,response.user);}),
            tap((response:IAuth)=>{response.access_token ? this.setToken(response.access_token):undefined}),
            map((response:IAuth)=>{return response.access_token})
            )
    }

    signOut(){
        this.updateAuthStatus(false,intialUser);
        localStorage.removeItem('token');
    }

    setToken(accessToken:string) {
        localStorage.setItem('token',accessToken);
    }  

    getToken() {
        const token= localStorage.getItem('token');
        return token ? token:null;
    }

  isAuth(){
      return this.authStatus$.value;
  }
}
