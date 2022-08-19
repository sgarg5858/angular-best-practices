import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService, User } from '../auth/auth.service';
import { DELAY } from '../injection-tokens/delay.token';
import { CustomDialogComponent } from '../shared/custom-dialog/custom-dialog.component';
import { DataEntryComponent } from './can-move-away.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit,DataEntryComponent {

  canExit()
  {
    if(this.updateMode && this.anyDataUnSaved)
    {
     const componentRef= this.matDialog.open(CustomDialogComponent,
        {
          data:"Data Changes will be lost. Are you sure you want to leave?",
          width:"300",
          height:"200",
          disableClose:true
        })

      return componentRef.afterClosed();

    }
    return true;
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeReload(event:BeforeUnloadEvent) {
    if(this.updateMode && this.anyDataUnSaved) event.returnValue=false;
  }

  constructor(
    public authService:AuthService,
    @Inject(DELAY) private delay:number,
    private matDialog:MatDialog
    ) { }

  updateMode:boolean=false;
  anyDataUnSaved:boolean=false;

  unsavedData()
  {
    this.anyDataUnSaved=true;
  }

  changeToEditMode(updateMode:boolean)
  {
    this.updateMode=updateMode;
    this.anyDataUnSaved=false;
  }

  ngOnInit(): void {
   
  }

  updateDetails(user:Partial<User>)
  {
    console.log(user);
    this.authService.updateNameAndContactNumber(user);

    setTimeout(()=>{
      this.updateMode=false;
      this.anyDataUnSaved=false;
    },this.delay)
  }
  //for our canDeactivate guard to work we need to make one function
  // canDeactivate guard will call
  

}
