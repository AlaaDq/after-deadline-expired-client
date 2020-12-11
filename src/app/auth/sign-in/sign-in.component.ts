import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../core/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

    return: string = '';
    form: FormGroup;

    constructor(private authService: AuthService,
                private router: Router,
                private route: ActivatedRoute,
                private fb: FormBuilder

                ) { }

    ngOnInit() {
        this.form = this.fb.group({
            email: ['',[Validators.required,Validators.email]],       
            password: ['',[Validators.required, Validators.minLength(6)]],
          });
    }

    get f(){
        return this.form.value;
    }


    get email()  {
    return this.form.get('email');
    }
    
    get password()  {
    return this.form.get('password');
    }
    
  
    onSignin() {
      this.authService.signin(this.f.email, this.f.password)
      .subscribe(
        (access_token:string) => 
        {   
            this.return='/';
            this.router.navigateByUrl(this.return);
        },
        error => console.log(error)
      );
    }
}
