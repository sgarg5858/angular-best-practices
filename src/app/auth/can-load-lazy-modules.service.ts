import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { filter, map, Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanLoadLazyModulesService implements CanLoad{

  constructor(private authService:AuthService,private router:Router) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.authService.user$.pipe(
      map((user)=>user? true : false),
      tap((loggedIn:boolean)=>{
        if(!loggedIn)
        {
          console.log(route.path);
          //check this if it works?
          this.router.navigate(['login'],{queryParams:{returnUrl:route.path}});
        }
      }),
      take(1)
    )

  }
}
