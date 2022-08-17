import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import {MatCardModule} from '@angular/material/card'
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const components = [ CommonModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatIconModule,
  MatCardModule,MatProgressBarModule,MatToolbarModule,MatSnackBarModule,MatTooltipModule,MatSidenavModule,
  MatSlideToggleModule,MatProgressSpinnerModule
]

@NgModule({
  declarations: [],
  imports: [...components],
  exports:[   ...components ]
})
export class MaterialComponentsModule { }
