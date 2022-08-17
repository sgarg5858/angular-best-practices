import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { delay, filter, map, Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanLoadLazyModulesService implements CanLoad{

  constructor(private authService:AuthService,private router:Router) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.authService.user$.pipe(
      delay(1000),
      tap((user)=>{console.log(user)}),
      map((user)=>user? true : false),
      map(
        (isLoggedIn) => 
        isLoggedIn || this.router.createUrlTree(['login'],{queryParams:{returnUrl:route.path}})
        ),
    )

  }
}
