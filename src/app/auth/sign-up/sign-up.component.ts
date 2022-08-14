import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { checkIfBothControlsHaveSameValue } from 'src/app/validators/checkIfBothPasswordsAreSame';
import { isLength } from 'src/app/validators/checkIfLengthisN';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  signupForm = new FormGroup({
    name: new FormControl('',{validators:[Validators.required]}),
    // mimic unique email validator using local storage!
    email: new FormControl('',{validators:[Validators.required,Validators.email]}),
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

  signUp()
  {
    console.log(this.signupForm)
  }

}
