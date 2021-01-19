import { Component, OnInit } from '@angular/core';
import { FacadeService } from './service/facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'ng-medecin';
  subTitle: String = 'Mon cabinet';
  isOpen: boolean = true;
  
  
  ngOnInit() {
  }

  onToggle(event) {
    //console.log('parent: ', event);
    this.isOpen = event;
  }


  onChangeTitle(event) {
    //console.log('parent: ', event);
    this.subTitle = event;
  }
  constructor(private facadeService: FacadeService){}
}
