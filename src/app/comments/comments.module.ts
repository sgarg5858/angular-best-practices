import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comment/comment.component';
import { ContainerComponent } from './container/container.component';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';
import { RouterModule } from '@angular/router';
import {ScrollingModule} from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    CommentsComponent,
    CommentComponent,
    ContainerComponent,
    CommentDetailComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    RouterModule.forChild([
      {
        path:'',component:CommentsComponent
      }
    ])
  ]
})
export class CommentsModule { }
