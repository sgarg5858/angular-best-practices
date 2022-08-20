import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, delay, Observable, of } from 'rxjs';
import { CustomSnackbarComponent } from '../shared/custom-snackbar/custom-snackbar.component';
import { Post, PostsService } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class ResolvePostsService  implements Resolve<Post[]>{

  constructor(private postService:PostsService,private router:Router,private matSnackbar:MatSnackBar) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Post[] | Observable<Post[]> | Promise<Post[]> 
  {
      return < Observable<Post[]>>this.postService.getPosts().pipe(
        delay(2000),
        catchError((err)=>
        {
          this.matSnackbar.openFromComponent(
            CustomSnackbarComponent,
            {
              data:"Couldn't load posts",
              duration:2000
            }
          );
          this.router.navigate(['home']);
          return of(null)
        })
      )
       ;
  }
}
