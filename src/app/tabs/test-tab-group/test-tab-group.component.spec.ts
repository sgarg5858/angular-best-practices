import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTabGroupComponent } from './test-tab-group.component';

describe('TestTabGroupComponent', () => {
  let component: TestTabGroupComponent;
  let fixture: ComponentFixture<TestTabGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTabGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTabGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
