import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { IUser } from '../shared/interfaces';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  authState$:BehaviorSubject<boolean>;
  user$:BehaviorSubject<IUser>;

    constructor(private breakpointObserver: BreakpointObserver,private authService:AuthService  )
    {
        this.authState$ =this.authService.authStatus$;
        this.user$ =this.authService.user$;
        console.log(this.authState$);
        console.log(this.user$);
    }

    ngOnInit(){
        this.authService.user().subscribe(data=>data)
    }

    logout(){
        this.authService.logout().subscribe((response:any)=>{})
    }


}
