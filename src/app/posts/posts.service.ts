import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, filter, of, skip, take } from 'rxjs';
import { Config, ConfigService } from '../initializer/config.service';
import { CustomSnackbarComponent } from '../shared/custom-snackbar/custom-snackbar.component';

export interface Post{
  userId:number,
  id:number,
  title:string,
  body:string
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  baseURL:string="";

  constructor(
    private configService:ConfigService,
    private httpClient:HttpClient,
    private matSnackBar:MatSnackBar,
    private router:Router
    ) {
    this.configService.config$.pipe(take(1)).subscribe((config)=>{
      this.baseURL=config!.baseUrl;
    })
   }

   private postsSubject = new BehaviorSubject<Post[]|null>([]);
   public readonly posts$ = this.postsSubject.asObservable().
   pipe(
    filter((posts)=>{
      if(!posts || posts && posts.length>0)
      {
        return true;
      }
      else{
        return false;
      }
    })
   )

   getPosts()
   {
    return this.httpClient.get<Post[]>(`${this.baseURL}posts`);
   }


}
