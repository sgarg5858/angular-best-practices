import { Inject, Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, distinctUntilChanged, filter, map, Observable, of, pluck, skip } from 'rxjs';
import { DELAY } from '../injection-tokens/delay.token';
import { LOCAL_STORAGE } from '../injection-tokens/local-storage.token';
import { CustomSnackbarComponent } from '../shared/custom-snackbar/custom-snackbar.component';

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

  constructor(
    @Inject(LOCAL_STORAGE) private myLocalStorage:Storage,
    private router:Router,
    private _snackBar:MatSnackBar,
    @Inject(DELAY) private delay:number
    ) { 
  }
  //This behavior subject has whole Auth State kind of like feature state in redux
  private authStateSubject = new BehaviorSubject<AuthState>({user:null,loading:false,authError:""});

  //Selectors We can say
  //This slices user part of it, we can user selector
  public readonly user$ = this.authStateSubject.asObservable().pipe(
    filter((authState)=>authState!=null),
    map((authState)=>authState?.user),
    distinctUntilChanged()
  )
  //THis slices loading part of that
  public readonly loading$ = this.authStateSubject.asObservable().pipe(
    filter((authState)=>authState!=null),
    map((authState)=>authState?.loading),
    distinctUntilChanged()
  );
  //this slices authError part of that
  public readonly authError$ = this.authStateSubject.asObservable().pipe(
    filter((authState)=>authState!=null),
    map((authState)=>authState?.authError),
    distinctUntilChanged()
  );

  //Our Reducer we can say!
  updateAuthState(state:AuthState,delay:number):void
  {
    setTimeout(()=>{
      this.authStateSubject.next(state);
    },delay)
  }

  // Utility function to get all users from local storage
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
      return of({emailAlreadyTaken:true}).pipe(delay(this.delay));
    }
    
    return of(null).pipe(delay(5000));
  }

//Traverses through array to find if user is in the list!
  checkIfListHasUserWithEmail(email:string,users:User[]):User |undefined
  {
    if(users.length === 0) return ;
    let matching = users.find((user:User)=>user.email===email)
    return matching;
  }

  signup(user:User,returnUrl:string|null)
  {
    //Set the loading indicator to true as we are starting the signup process
    this.updateAuthState({...this.authStateSubject.value,loading:true,authError:""},0);
    

    let users=this.getUsersFromLocalStorage();

    //Since the email is already taken, throw the error!
    if(this.checkIfListHasUserWithEmail(user.email,users))
    {
      this.authStateSubject.next({...this.authStateSubject.value,authError:"This email is already taken,try logging in or reset password!"});
    }
    else
    {
    
      //add to all users list!
      if(users && Array.isArray(users)){
        users=[...users,user];
      }
      //set the user & loading to false;
      this.updateAuthState({user,loading:false,authError:""},this.delay);
      this.doNavigate(returnUrl,this.delay);
      this.showSnackBar("Signedup Successfully!")
      //updating in local storage!
      this.myLocalStorage.setItem('users',JSON.stringify(users));

    //Add  snackbar here!

    }

    
  }

  login(email:string,password:string,returnUrl:string|null)
  {

    //Set the loading indicator to true
    this.updateAuthState({user:null,loading:true,authError:""},0);

    let users =this.getUsersFromLocalStorage();

    let userFound = this.checkIfListHasUserWithEmail(email,users);
    if(userFound)
    {
      if(userFound.password === password)
      {
        this.updateAuthState({user:userFound,loading:false,authError:""},this.delay);
        console.log("LOGIN WORKED")
        this.showSnackBar("Login Successful")
        this.doNavigate(returnUrl,this.delay);
        
      }
      else{
        //change loading to
        this.updateAuthState({user:null,loading:false,authError:"Wrong Password!"},this.delay);
      }
    }
    else
    {
      this.updateAuthState({user:null,loading:false,authError:"User not found, Try signing up!"},this.delay);
    }

    
  }

  resetTheLoginFormError()
  {
    console.log("HELLO")
    this.updateAuthState({...this.authStateSubject.value,authError:"",loading:false},0);
  }
  

  doNavigate(returnUrl:string|null,delay:number)
  {
    setTimeout(()=>{
      console.log("NAVIGATION",returnUrl);
      if(returnUrl == null || returnUrl === "")
      {
        this.router.navigateByUrl('home');
      }
      else{
        this.router.navigate([returnUrl],{queryParamsHandling:''}).then((val)=>{
          console.log(val);
        }).catch((error)=>{
          console.log(error);
        })
      }
    },delay)
  }

  showSnackBar(data:string,delay?:number)
  {
    setTimeout(()=>{
    this._snackBar.openFromComponent(CustomSnackbarComponent,{data,duration:1000})
    },delay??this.delay)
  }

  logout()
  {
    this.updateAuthState({user:null,loading:false,authError:""},0);
    this.doNavigate('login',0);
    this.showSnackBar("You have been logout out",0)
  }
}
