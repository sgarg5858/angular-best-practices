import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(
    public authService:AuthService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }

  loginForm = new FormGroup({
    email : new FormControl('sgarg5858@gmail.com',[Validators.required,Validators.email]),
    password: new FormControl('12121212',[Validators.required,Validators.minLength(6)])
  })

  returnURl:string|null=null;


  ngOnInit(): void {


    this.activatedRoute.queryParamMap.pipe(take(1)).subscribe((queryParams:ParamMap)=>{
      if(queryParams.has('returnUrl') && queryParams.get('returnUrl'))
      {
        this.returnURl = queryParams.get('returnUrl');
      }
    })

  
    this.authService.user$.subscribe((user)=>{
      console.log("USER",user)
    })
   

  }

  login()
  {
    console.log("BAM")
    if(this.loginForm.valid)
    {
      this.resetLoginFormError();
      let email = this.loginForm.controls.email.value!;
      let password = this.loginForm.controls.password.value!;
      this.authService.login(email,password,this.returnURl);
      // this.loginForm.reset({email,password})
    }
  }

  resetLoginFormError()
  {
    this.authService.resetTheLoginFormError();
  }
  

}
