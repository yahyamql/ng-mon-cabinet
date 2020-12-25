import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { TITLES }  from '../Constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() changeTitle = new EventEmitter<String>();
  headerLabel: String = 'Mon cabinet'
  titles = TITLES;
  constructor() { }

  onLabelHeaderEmit(value: String) {
    console.log(value);
    this.changeTitle.emit(value);
  }

  ngOnInit() {
  }

}
