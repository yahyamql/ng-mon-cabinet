import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FacadeService } from 'src/app/service/facade.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() subTitle: String = 'Mon Cabinet';
  @Output() toggleSideBar: EventEmitter<boolean> = new EventEmitter();
  isOpened = false;
  onToggleSideBar() {
    this.isOpened = !this.isOpened;
    this.toggleSideBar.emit(this.isOpened);
  }
 

  constructor( public facadeService: FacadeService) { }

  ngOnInit() {
 
  }

}
