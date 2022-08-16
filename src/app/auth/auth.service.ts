import { Inject, Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, distinctUntilChanged, filter, map, Observable, of, pluck, skip } from 'rxjs';
import { LOCAL_STORAGE } from '../injection-tokens/local-storage.token';

export interface User{
  name:string;
  email:string;
  contact:string;
  password:string;
  confirmPassword?:string;
}
export interface AuthState{
  user:User | null,
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

  private authStateSubject = new BehaviorSubject<AuthState>({user:null,loading:false,authError:""});
  public readonly user$ = this.authStateSubject.asObservable().pipe(
    filter((authState)=>authState!=null),
    map((authState)=>authState?.user),
    distinctUntilChanged()
  )
  public readonly loading$ = this.authStateSubject.asObservable().pipe(
    filter((authState)=>authState!=null),
    map((authState)=>authState?.loading),
    distinctUntilChanged()
  );

  public readonly authError$ = this.authStateSubject.asObservable().pipe(
    filter((authState)=>authState!=null),
    map((authState)=>authState?.authError),
    distinctUntilChanged()
  );

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
  //this is for email validation!
  checkIfThisUserAlreadyExists(control:AbstractControl):Observable<ValidationErrors|null>
  {
    const email = control.value;
    const users = this.getUsersFromLocalStorage();

    if(this.checkIfListHasUserWithEmail(email,users))
    {
      return of({emailAlreadyTaken:true}).pipe(delay(3000));
    }
    
    return of(null).pipe(delay(5000));
  }

  updateAuthState(state:AuthState,delay:number):void
  {
    setTimeout(()=>{
      this.authStateSubject.next(state);
    },delay)
  }

  checkIfListHasUserWithEmail(email:string,users:User[]):User |undefined
  {
    if(users.length === 0) return ;
    let matching = users.find((user:User)=>user.email===email)
    return matching;
  }

  signup(user:User)
  {
    //Set the loading indicator to true as we are starting the signup process
    this.updateAuthState({...this.authStateSubject.value,loading:true,authError:""},0);
    

    let users=this.getUsersFromLocalStorage();

    //Since the email is already taken, throw the error!
    if(this.checkIfListHasUserWithEmail(user.email,users))
    {
      this.authStateSubject.next({...this.authStateSubject.value,authError:"This email is already taken"});
    }
    else
    {
    

      //add to all users list!
      if(users && Array.isArray(users)){
        users=[...users,user];
      }
      //set the user & loading to false;
      this.updateAuthState({...this.authStateSubject.value,user,loading:false,authError:""},3000);
      //updating in local storage!
      this.myLocalStorage.setItem('users',JSON.stringify(users));


    //show snackbar here!
    }

    
  }

  login(email:string,password:string,returnUrl:string|null)
  {

    //Set the loading indicator to true
    this.updateAuthState({...this.authStateSubject.value,loading:true,authError:""},0);

    let users =this.getUsersFromLocalStorage();

    let userFound = this.checkIfListHasUserWithEmail(email,users);
    if(userFound)
    {
      if(userFound.password === password)
      {
        this.updateAuthState({user:userFound,loading:false,authError:""},3000);
      }
      else{
        this.updateAuthState({user:null,loading:false,authError:"Wrong Password!"},3000);
      }
    }
    else
    {
      this.updateAuthState({user:null,loading:false,authError:"User not found, Try signing up!"},3000);
    }

    
  }

  resetTheLoginFormError()
  {
    console.log("HELLO")
    this.updateAuthState({...this.authStateSubject.value,authError:""},0);
  }
  
}
