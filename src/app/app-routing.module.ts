import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsUserLoggedInService } from './auth/is-user-logged-in.service';
import { LogInComponent } from './auth/log-in/log-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

const routes: Routes = [
  {
    path:'signup',component:SignUpComponent,canActivate:[IsUserLoggedInService]
  },
  {
    path:'login',component:LogInComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
