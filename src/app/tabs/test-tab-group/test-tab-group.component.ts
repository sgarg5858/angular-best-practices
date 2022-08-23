import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test-tab-group',
  templateUrl: './test-tab-group.component.html',
  styleUrls: ['./test-tab-group.component.scss']
})
export class TestTabGroupComponent implements OnInit {

  showContactForm:boolean=false;
  toggle()
  {
    this.showContactForm=!this.showContactForm;
  }
  constructor() { }

  ngOnInit(): void {
  }
  loginForm= new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  })
  signupForm= new FormGroup({
    email:new FormControl(''),
    password:new FormControl(''),
    confirmPassword: new FormControl('')
  })
  contactForm= new FormGroup({
    email:new FormControl(''),
    message:new FormControl('')
  })

}
