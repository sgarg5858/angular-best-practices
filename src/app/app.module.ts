import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationAndRoutingIndicatorModule } from './navigation-and-routing-indicator/navigation-and-routing-indicator.module';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http'
import { InitializerModule } from './initializer/initializer.module';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    NavigationAndRoutingIndicatorModule,
    InitializerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
