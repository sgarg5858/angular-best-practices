import { Component, ContentChild, OnInit, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements OnInit {

  constructor() { }

  @ContentChild(TabComponent) tabs:QueryList<TabComponent>|undefined;

  ngOnInit(): void {
  }

}
