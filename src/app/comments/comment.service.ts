import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { ConfigService } from '../initializer/config.service';

export interface Comment{
  postId:number,
  id:number,
  name:string,
  email:string,
  body:string
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl:string="";
  constructor(private configService:ConfigService,private httpClient:HttpClient) {

    this.configService.config$.pipe(take(1)).subscribe((config)=>{
      this.baseUrl=config?.baseUrl!;
    })
   }
   private commentsSubject = new BehaviorSubject<Comment[]|null>(null);
   public readonly comments$ = this.commentsSubject.asObservable();

   getComments()
   {
    this.httpClient.get<Comment[]>(`${this.baseUrl}comments`).subscribe(
      {
        next:(comments)=>{
          this.commentsSubject.next(comments);
        },
        error:(error)=>{
          this.commentsSubject.next([]);
        }
      }
    )
   }
}
