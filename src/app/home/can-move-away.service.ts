import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface DataEntryComponent{
  canExit:()=>boolean | Observable<boolean> | Promise<boolean>
}

@Injectable({
  providedIn: 'root'
})
export class CanMoveAwayService implements CanDeactivate<DataEntryComponent> {

  constructor() { }
  canDeactivate(component: DataEntryComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot | undefined): 
  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
  {
    return component.canExit();
  }
}
