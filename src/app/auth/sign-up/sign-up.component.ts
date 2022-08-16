import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkIfBothControlsHaveSameValue } from 'src/app/validators/checkIfBothPasswordsAreSame';
import { isLength } from 'src/app/validators/checkIfLengthisN';
import { AuthService, User } from '../auth.service';
import { EmailValidationService } from '../email-validation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private authService:AuthService,private emailValidationService:EmailValidationService) { }

  ngOnInit(): void {
  }

  signupForm = new FormGroup({
    name: new FormControl('',{validators:[Validators.required]}),
    // mimic unique email validator using local storage!
    email: new FormControl('',{validators:[Validators.required,Validators.email],asyncValidators:[this.validateEmail.bind(this)]}),
    //add validator for length 10 => DONE!
    contact: new FormControl('',{validators:[Validators.required,isLength(10)]}),
    password: new FormControl('',{validators:[Validators.required,Validators.minLength(6)]}),
    confirmPassword: new FormControl('',{validators:[Validators.required]})
    //write a validator to check both passwords are same => DONE!
  },{
    validators:[checkIfBothControlsHaveSameValue('password','confirmPassword')]
    ,updateOn:'change'
  }
    )

    validateEmail(control:AbstractControl)
    {
      return this.authService.checkIfThisUserAlreadyExists(control);
    }

  signUp()
  {
    console.log(this.signupForm);
    //proceed for
    if(this.signupForm.valid)
    {
      let user:User ={
        name:this.signupForm.controls.name.value!,
        email:this.signupForm.controls.email.value!,
        contact:this.signupForm.controls.contact.value!,
        password:this.signupForm.controls.password.value!
      }
      this.authService.signup(user);
    }
    //show a snackbar or modal to user about missing or wrong data!
    else{

    }
  }

}
