import { Inject, Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, Observable, of, skip } from 'rxjs';
import { LOCAL_STORAGE } from '../injection-tokens/local-storage.token';

export interface User{
  name:string;
  email:string;
  contact:string;
  password:string;
  confirmPassword?:string;
}
export interface AuthState{
  user:User,
  loading:boolean,
  authError:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(LOCAL_STORAGE) private myLocalStorage:Storage,private router:Router) { 
    console.log(myLocalStorage)
  }

  private userBehaviorSubject = new BehaviorSubject<User|null>(null);
  public readonly user$ = this.userBehaviorSubject.asObservable();
  private loginBehaviorSubject = new BehaviorSubject<string|null>(null);
  public readonly loginError$ =this.loginBehaviorSubject.asObservable().pipe(skip(1));
  private loadingBehaviorSubject = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loadingBehaviorSubject.asObservable();


  getUsersFromLocalStorage()
  {
    const checkLocalStorage = this.myLocalStorage.getItem('users');
    let users:User[]=[];
    
    if(checkLocalStorage)
    {
      let tempUsers = JSON.parse(checkLocalStorage);
      if( Array.isArray(tempUsers) && tempUsers.length >0 && "name" in tempUsers[0] && "email" in tempUsers[0] && "contact" in tempUsers[0])
      {
        users=tempUsers;
      }
    }
    return users; 
  }

  checkIfThisUserAlreadyExists(control:AbstractControl):Observable<ValidationErrors|null>
  {
    const email = control.value;
    const users = this.getUsersFromLocalStorage();

    if(users.length>0)
    {
      let matching = users.find((user:User)=>user.email===email)
      if(matching)
      {
        return of({emailAlreadyTaken:true}).pipe(delay(3000));
      }
    }
    
    return of(null).pipe(delay(5000));
  }

  loadingIndicator(show:boolean)
  {
    this.loadingBehaviorSubject.next(show);
  }

  signup(user:User)
  {
    this.loadingIndicator(true);
    

    let users=this.getUsersFromLocalStorage();

    if(users && Array.isArray(users)){
      users=[...users,user];
    }

    this.loadingIndicator(false);

    //sending to listeners!
    this.userBehaviorSubject.next(user);
    //updating in local storage!
    this.myLocalStorage.setItem('users',JSON.stringify(users));

    //show snackbar here!

    
  }

  login(email:string,password:string,returnUrl:string|null)
  {

    this.loadingIndicator(true);

    let users =this.getUsersFromLocalStorage();

    if(users.length>0)
    {
      let matching:User|undefined = users.find((user:User)=>user.email===email);
      console.log(matching)
      if(matching)
      {
        if( matching.password === password)
        {
        this.userBehaviorSubject.next(matching);
        if(returnUrl)
        {
          this.router.navigate([returnUrl])
        }
        else{
          this.router.navigate(['home'])
        }
        }
        else
        {
          setTimeout(()=>{
            this.loginBehaviorSubject.next("Wrong Password");
             this.loadingIndicator(false);

          },4000)
        }
        
      }
      else{
        setTimeout(()=>
        {
          this.loginBehaviorSubject.next("User not found!")
          this.loadingIndicator(false);

        },4000)
      }
    }
    else
    {
    setTimeout(()=>{
      this.userBehaviorSubject.next(null);
      this.loginBehaviorSubject.next("User not found!")
      this.loadingIndicator(false);

    },4000)
    }
  }

  resetTheLoginFormError()
  {
    console.log("HELLO")
    this.loginBehaviorSubject.next(null);
  }
  
}
