import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingIndicatorComponent } from './routing-indicator/routing-indicator.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    RoutingIndicatorComponent,
    NavbarComponent
  ],
  exports:[
    RoutingIndicatorComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    RouterModule.forChild([])
  ]
})
export class NavigationAndRoutingIndicatorModule { }
