import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { HomeComponent } from './home.component';
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UpdateDetailsComponent,HomeComponent
  ],
  exports:[UpdateDetailsComponent,HomeComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
