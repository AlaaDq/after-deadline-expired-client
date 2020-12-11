import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { IUser } from '../shared/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    authState$:BehaviorSubject<boolean>;
    user$:BehaviorSubject<IUser>;

    constructor(private authService:AuthService  )
    {
        this.authState$ =this.authService.authStatus$;
        this.user$ =this.authService.user$;
        console.log(this.authState$);
        console.log(this.user$);
    }

    ngOnInit(): void {
    }

}
