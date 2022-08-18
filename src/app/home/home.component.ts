import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { AuthService, User } from '../auth/auth.service';
import { DELAY } from '../injection-tokens/delay.token';
import { DataEntryComponent } from './can-move-away.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit,DataEntryComponent {

  canExit()
  {
    if(this.updateMode)
    {
      if(confirm("Data Changes will be lost. Are you sure you want to leave"))
      {
        return true;
      }
      return false;
    }
    return true;
  }

  @HostListener('window:beforeunload', ['$event'])
  doSomething($event:any) {
    if(this.updateMode) $event.returnValue=false;
  }

  constructor(public authService:AuthService,@Inject(DELAY) private delay:number) { }

  updateMode:boolean=false;
  changeToEditMode(updateMode:boolean)
  {
    this.updateMode=updateMode;
  }

  ngOnInit(): void {
   
  }

  updateDetails(user:Partial<User>)
  {
    console.log(user);
    this.authService.updateNameAndContactNumber(user);

    setTimeout(()=>{
      this.updateMode=false;
    },this.delay)
  }
  //for our canDeactivate guard to work we need to make one function
  // canDeactivate guard will call
  

}
