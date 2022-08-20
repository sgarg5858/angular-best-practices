import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { filter, map, merge, Observable, tap } from 'rxjs';
import { CustomSnackbarComponent } from 'src/app/shared/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-routing-indicator',
  templateUrl: './routing-indicator.component.html',
  styleUrls: ['./routing-indicator.component.scss']
})
export class RoutingIndicatorComponent implements OnInit {

  constructor(private router:Router,private matSnackbar:MatSnackBar) { }

  public loading$:Observable<boolean>|undefined;
  private showLoader$!:Observable<boolean>;
  private hideLoader$!:Observable<boolean>;

  ngOnInit(): void {
    this.approach1();
  }

  approach1()
  {
    this.showLoader$=this.router.events.
    pipe(
      filter((event)=> event instanceof NavigationStart),
      map((event)=>true)
      )

      this.hideLoader$=this.router.events.
    pipe(
      filter(
        (event)=> event instanceof NavigationEnd || 
                  event instanceof NavigationCancel || 
                  event instanceof NavigationError),
      map((event)=>false)
      )
      
      this.loading$=merge(this.showLoader$,this.hideLoader$);
  }

  approach2()
  {
    this.loading$= this.router.events.pipe(
      filter((event)=> event instanceof NavigationStart ||
                       event instanceof NavigationEnd || 
                       event instanceof NavigationCancel || 
                       event instanceof NavigationError 
            ),
      map((event)=>event instanceof NavigationStart)      
    )
  }

}
