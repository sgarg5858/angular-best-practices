import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { concatMap, Observable, of, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloadFrequentlyUsedModulesService implements PreloadingStrategy {

  constructor() { }
  //Basically return an observable which will emit after some delay &
  //on emitting it will call the function loadModule & subscribe to observable 
  //returned by thus we use Higher Order Observable
  preload(route: Route, loadModule: () => Observable<any>): Observable<any> {

    if(route?.data?.['preload'])
    {
      let delay:number = route?.data?.['delay'] ?? 4000;
      console.log('preload called on '+route.path+' delay is '+delay);
      
      //We will have to call this function & this function returns observable
      // we will need to subscribe to it 
      return timer(delay).pipe(
        concatMap(()=>loadModule())
      )
    }
    return of(null);
  }
}
