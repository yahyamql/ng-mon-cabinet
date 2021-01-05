import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FacadeService } from 'src/app/service/facade.service';

import { TITLES }  from '../Constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() changeTitle = new EventEmitter<String>();
  /* @ViewChild('sidenav') public sidenav: MatSidenav; */
  headerLabel: String = 'Mon cabinet'
  titles = TITLES;
  constructor(private facadeService: FacadeService) { }


  onLabelHeaderEmit(value: String) {
    console.log(value);
    this.changeTitle.emit(value);
  }

  ngOnInit() {
    /* 
    this.facadeService.toggleSideBar.subscribe((res: boolean)=> {
      if(res) {
        this.sidenav.open();
        console.log('this.sidenav.open();')
      } else {
        this.sidenav.close();
        console.log('this.sidenav.close();')
      }
    }) */
  }

}
