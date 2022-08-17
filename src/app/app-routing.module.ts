import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { defer, delay } from 'rxjs';
import { CanLoadLazyModulesService } from './auth/can-load-lazy-modules.service';
import { IsUserLoggedInService } from './auth/is-user-logged-in.service';
import { LogInComponent } from './auth/log-in/log-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'signup',component:SignUpComponent,
  },
  {
    path:'home',component:HomeComponent,canActivate:[IsUserLoggedInService]
  },
  {
    path:'login',component:LogInComponent
  },
  {
    path:'comments',
    loadChildren : ()=>  defer(()=>import('./comments/comments.module').then((m=>m.CommentsModule)))
  ,
    canLoad:[CanLoadLazyModulesService]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
