import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import { MaterialComponentsModule } from '../material-components/material-components.module';



@NgModule({
  declarations: [
    CustomSnackbarComponent
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule
  ],
  exports:[CustomSnackbarComponent]
})
export class SharedModule { }
