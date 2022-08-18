import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { HomeComponent } from './home.component';
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { RouterModule } from '@angular/router';
import { IsUserLoggedInService } from '../auth/is-user-logged-in.service';
import { CanMoveAwayService } from './can-move-away.service';



@NgModule({
  declarations: [
    UpdateDetailsComponent,HomeComponent, ShowDetailsComponent
  ],
  exports:[UpdateDetailsComponent,HomeComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:'home',
        component:HomeComponent,
        canActivate:[IsUserLoggedInService],
        canDeactivate:[CanMoveAwayService]
        // children:[
        //   {
        //     path:'show-details',
        //     component:ShowDetailsComponent
        //   },
        //   {
        //     path:'update-details',
        //     component:UpdateDetailsComponent,
        //     canDeactivate:[]
        //   }
        // ]
      }
    ])
  ]
})
export class HomeModule { }
