import { Inject, Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { LOCAL_STORAGE } from '../injection-tokens/local-storage.token';

export interface User{
  name:string;
  email:string;
  contact:string;
  password:string;
  confirmPassword?:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(LOCAL_STORAGE) private myLocalStorage:Storage) { 
    console.log(myLocalStorage)
  }

  private userBehaviorSubject = new BehaviorSubject<User|null>(null);
  public readonly user$ = this.userBehaviorSubject.asObservable();



  checkIfThisUserAlreadyExists(control:AbstractControl):Observable<ValidationErrors|null>
  {
    const email = control.value;
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
    if(users.length>0)
    {
      let matching = users.find((user:User)=>user.email===email)
      if(matching)
      {
        return of({emailAlreadyTaken:true}).pipe(delay(5000));
      }
    }
    
    return of(null).pipe(delay(5000));
  }

  signup(user:User)
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

    if(users && Array.isArray(users)){
      users.push(user);
    }
    //sending to listeners!
    this.userBehaviorSubject.next(user);
    //updating in local storage!
    this.myLocalStorage.setItem('users',JSON.stringify(users));

    //show snackbar here!

  }
  
}
