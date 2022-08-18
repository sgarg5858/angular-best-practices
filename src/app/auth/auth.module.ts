import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { NgxLoadingButtonsModule } from 'ngx-loading-buttons';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    SignUpComponent,
    LogInComponent
  ],
  exports:[
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    NgxLoadingButtonsModule,
    SharedModule,
    RouterModule.forChild([])
  ]
})
export class AuthModule { }
