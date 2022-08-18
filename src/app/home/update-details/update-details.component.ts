import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/auth.service';
import { isLength } from 'src/app/validators/checkIfLengthisN';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.scss']
})
export class UpdateDetailsComponent implements OnInit {

  @Input() showLoadingIndicator:boolean=false;

  @Input() set user(user:User |null)
  {
   if(user)
   {
    let {email,name,contact}=user;
    this.userDetailsForm.patchValue({name,contact});
   }
  }
  @Output() updateDetails = new EventEmitter<Partial<User>>();

  constructor() { }

  userDetailsForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    contact: new FormControl('',[Validators.required,isLength(10)]),
  })

  ngOnInit(): void {
  }
  update()
  {
    console.log(this.userDetailsForm);
    if(this.userDetailsForm.valid)
    {
      let {name,contact}=this.userDetailsForm.controls;
      console.log(name,contact)
      this.updateDetails.next({name:name.value!,contact:contact.value!});
    }
  }

}
