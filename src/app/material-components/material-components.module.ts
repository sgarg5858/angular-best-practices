import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import {MatCardModule} from '@angular/material/card'

const components = [ CommonModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatIconModule,
  MatCardModule]

@NgModule({
  declarations: [],
  imports: [...components],
  exports:[   ...components ]
})
export class MaterialComponentsModule { }
