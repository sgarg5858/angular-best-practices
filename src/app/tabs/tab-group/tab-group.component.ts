import { AfterContentChecked, Component, ContentChild, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements AfterContentChecked {

  constructor() { }
  @Input() headerTemplate:TemplateRef<{tabs:QueryList<TabComponent>}>|undefined;

  //We gonna check if it updates tabs dynamically
  @ContentChildren(TabComponent) tabs:QueryList<TabComponent>|undefined;

  
  ngAfterContentChecked(): void {
      if(this.tabs)
      {
       this.markFirstSelectedIfNoOneIsSelectedInitially(this.tabs);
      }
  }

  get tabsContext()
  {
    return {tabs:this.tabs};
  }

  markFirstSelectedIfNoOneIsSelectedInitially(tabs:QueryList<TabComponent>)
  {
    const selectedTab = this.tabs?.find((tab)=>tab.selected);
    if(!selectedTab)
    {
      if(tabs.length>0)
      {
        tabs.first.selected=true;
      }
    }
  }

  select(tab:TabComponent)
  {
    if(this.tabs)
    {
      this.tabs.forEach((tab,index)=>{
       tab.selected=false;
      })
      tab.selected=true;
    }
  }
  queryAndSelectTab()
  {
    
  }

}
