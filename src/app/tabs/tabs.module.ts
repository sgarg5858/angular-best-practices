import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab/tab.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { RouterModule } from '@angular/router';
import { TestTabGroupComponent } from './test-tab-group/test-tab-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from '../material-components/material-components.module';



@NgModule({
  declarations: [
    TabComponent,
    TabGroupComponent,
    TestTabGroupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    RouterModule.forChild([
      {
        path:'',component:TestTabGroupComponent
      }
    ])
  ],
  exports:[
    TabGroupComponent
  ]
})
export class TabsModule { }
