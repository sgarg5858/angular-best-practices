import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Post, PostsService } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class ResolvePostsService  implements Resolve<Post[]>{

  constructor(private postService:PostsService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Post[] | Observable<Post[]> | Promise<Post[]> 
  {
      this.postService.getPosts();
      return this.postService.posts$ as Observable<Post[]> ;
  }
}
