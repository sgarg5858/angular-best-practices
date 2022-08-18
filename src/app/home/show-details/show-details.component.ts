import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit {

  @Input() user:User|null=null;
  @Output() updateMode = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  switchToEditMode()
  {
    this.updateMode.emit(true);
  }

}
