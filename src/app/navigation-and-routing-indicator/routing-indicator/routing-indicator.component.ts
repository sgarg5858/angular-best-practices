import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

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
      filter((event)=>{
        return event instanceof NavigationStart || event instanceof NavigationEnd ||
               event instanceof NavigationCancel || event instanceof NavigationError
      })
      ,map((event)=> event instanceof NavigationStart)
    )

  }

}
