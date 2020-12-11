import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorDialogService } from '../core/errordialog.service';



@Injectable({providedIn: 'root'})

export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(public errorDialogService: ErrorDialogService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : "",
                    status: error.status
                };
                let mydata={};
                console.log("errrror",error)
                data = {
                        message: error && error.error.message  ? error.error.message : "some error happend !!",
                        status: error.status ? error.status : '',
                        errors: error && error.error.errors ? error.error.errors : {} ,
                    };

                this.errorDialogService.openDialog(data);
                return throwError(error);
            }));
    }
}