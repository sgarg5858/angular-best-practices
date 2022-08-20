import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { filter, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-routing-indicator',
  templateUrl: './routing-indicator.component.html',
  styleUrls: ['./routing-indicator.component.scss']
})
export class RoutingIndicatorComponent implements OnInit {

  constructor(private router:Router) { }

  public loading$:Observable<boolean>|undefined;

  ngOnInit(): void {

    this.loading$ = this.router.events.pipe(
      tap((event)=>{

        //USEFUL When loading a lazy module!
        if(event instanceof RouteConfigLoadStart)
        {
          console.log("We will start loading lazy module now",event.route)
        }
        if(event instanceof RouteConfigLoadEnd)
        {
          console.log("We successfully loaded lazy module",event.route)
        }
        //useful when using resolver
        if(event instanceof ResolveStart)
        {
          console.log("We will start loading data via resolver for",event.url)
        }
        if(event instanceof ResolveEnd)
        {
          console.log("We successfully loaded data via resolver via",event.url,event.state)
        }

      }),
      filter((event)=>{
        return event instanceof NavigationStart || event instanceof NavigationEnd ||
               event instanceof NavigationCancel || event instanceof NavigationError
      })
      ,map((event)=> event instanceof NavigationStart)
    )

  }

}
