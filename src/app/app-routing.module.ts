import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { defer, delay } from 'rxjs';
import { CanLoadLazyModulesService } from './auth/can-load-lazy-modules.service';
import { IsUserLoggedInService } from './auth/is-user-logged-in.service';
import { LogInComponent } from './auth/log-in/log-in.component';
import { PreloadFrequentlyUsedModulesService } from './auth/preload-frequently-used-modules.service';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'signup',component:SignUpComponent,
  },
  {
    path:'login',component:LogInComponent
  },
  {
    path:'comments',
    loadChildren : ()=>  defer(()=>import('./comments/comments.module').then((m=>m.CommentsModule))),
    canLoad:[CanLoadLazyModulesService]
  },
    {
      path:'posts',
      loadChildren : ()=>  defer(()=>import('./posts/posts.module').then((m=>m.PostsModule))),
      data:{preload:true,delay:4000}
      
    },
    {
      path:'tabs',
      loadChildren : ()=>  defer(()=>import('./tabs/tabs.module').then((m=>m.TabsModule))),
      
    },
    {
      path:'',
      redirectTo:'home',
      pathMatch:'full'
      }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadFrequentlyUsedModulesService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
