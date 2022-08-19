import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
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
    this.userDetailsForm.patchValue({name,contact},{emitEvent:false});
   }
  }
  @Output() updateDetails = new EventEmitter<Partial<User>>();
  @Output() closeUpdate = new EventEmitter<boolean>();
  @Output() formValueChanged= new EventEmitter();
  constructor() { }

  userDetailsForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    contact: new FormControl('',[Validators.required,isLength(10)]),
  })

  ngOnInit(): void {
    this.userDetailsForm.valueChanges.pipe(take(1)).subscribe(()=>{
      this.formValueChanged.emit();
    })
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
  goBack()
  {
    this.closeUpdate.emit(false);
  }

}
