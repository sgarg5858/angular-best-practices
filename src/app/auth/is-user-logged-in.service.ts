import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { delay, map, Observable, take, tap } from 'rxjs';
import { DELAY } from '../injection-tokens/delay.token';
import { AuthService,User } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsUserLoggedInService implements CanActivate {

  constructor(
    private authService:AuthService,
    private router:Router,
    @Inject(DELAY) private delay:number
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.authService.user$.pipe(
      map((user)=>user ? true : false),
      map((isLoggedIn)=> isLoggedIn ? 
      isLoggedIn : 
      this.router.createUrlTree(['login'],{queryParams:{returnUrl:route.url}}) 
      ),
      delay(this.delay)
    )
  }
}
