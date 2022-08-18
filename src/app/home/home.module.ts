import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [
    UpdateDetailsComponent,HomeComponent
  ],
  exports:[UpdateDetailsComponent,HomeComponent],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
