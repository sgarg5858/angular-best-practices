import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { RouterModule } from '@angular/router';
import { ResolvePostsService } from './resolve-posts.service';



@NgModule({
  declarations: [
    PostsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',component:PostsComponent,
        resolve:{ posts: ResolvePostsService}
      }
    ])
  ]
})
export class PostsModule { }
