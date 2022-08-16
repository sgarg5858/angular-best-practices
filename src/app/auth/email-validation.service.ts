import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmailValidationService {

  constructor() {
   }

  checkEmail(authService:AuthService)
  {
    return (control:AbstractControl):Observable<ValidationErrors|null> =>
  {
    console.log(control)
    return authService.checkIfThisUserAlreadyExists(control.value);
  }
  }
}
