import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component';



@NgModule({
  declarations: [
    CustomSnackbarComponent,
    CustomDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule
  ],
  exports:[CustomSnackbarComponent,CustomDialogComponent]
})
export class SharedModule { }
