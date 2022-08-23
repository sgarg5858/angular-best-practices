import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabGroupComponent } from '../tab-group/tab-group.component';
import { TabComponent } from '../tab/tab.component';

import { TestTabGroupComponent } from './test-tab-group.component';

describe('TestTabGroupComponent', () => {
  let component: TestTabGroupComponent;
  let fixture: ComponentFixture<TestTabGroupComponent>;
  let tabGroup: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTabGroupComponent,TabGroupComponent,TabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTabGroupComponent);
    component = fixture.componentInstance;
    tabGroup=fixture.debugElement.query(By.css('app-tab-group'));
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit("there should be only one tab inside the tab container",()=>{
    let tabs = tabGroup.query(By.css('.tab'));
  
    expect(tabs).toBeTruthy();
    // expect(tabs.nativeElement.).toBe(1);
    console.log("TABS",tabs.nativeElement);
  })

  

});
