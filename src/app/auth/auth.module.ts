import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { UpdateDetailsComponent } from './update-details/update-details.component';



@NgModule({
  declarations: [
    SignUpComponent,
    LogInComponent,
    UpdateDetailsComponent
  ],
  exports:[
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialComponentsModule
  ]
})
export class AuthModule { }
