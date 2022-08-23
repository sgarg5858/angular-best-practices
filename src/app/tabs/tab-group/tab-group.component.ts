import { AfterContentChecked, Component, ContentChild, ContentChildren, OnInit, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements AfterContentChecked {

  constructor() { }

  //We gonna check if it updates tabs dynamically
  @ContentChildren(TabComponent) tabs:QueryList<TabComponent>|undefined;

  
  ngAfterContentChecked(): void {
      console.log(this.tabs);
      this.tabs?.changes.subscribe(console.log);
  }

}
