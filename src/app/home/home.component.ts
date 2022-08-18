import { Component, Inject, OnInit } from '@angular/core';
import { AuthService, User } from '../auth/auth.service';
import { DELAY } from '../injection-tokens/delay.token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

}
