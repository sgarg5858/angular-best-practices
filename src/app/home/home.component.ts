import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

  updateDetails(user:Partial<User>)
  {
    console.log(user);
    this.authService.updateNameAndContactNumber(user)
  }

}
