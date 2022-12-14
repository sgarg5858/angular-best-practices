import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { TabGroupComponent } from '../tab-group/tab-group.component';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-test-tab-group',
  templateUrl: './test-tab-group.component.html',
  styleUrls: ['./test-tab-group.component.scss']
})
export class TestTabGroupComponent implements OnInit,AfterViewChecked {

  @ViewChild(TabGroupComponent) tabGroup:TabGroupComponent | undefined;
  @ViewChild(MatButton) matButton:MatButton|undefined ;

  

  selectTab(ref:TabComponent)
  {
    if(this.tabGroup)
    {
      this.tabGroup.select(ref);
    }
  }

  showContactForm:boolean=false;
  toggle()
  {
    this.showContactForm=!this.showContactForm;
  }
  constructor() { }
  ngAfterViewChecked(): void {
    console.log(this.matButton?._elementRef.nativeElement)
  }

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
