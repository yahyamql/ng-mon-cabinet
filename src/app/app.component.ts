import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-medecin';
  subTitle: String = 'Mon cabinet';

  onChangeTitle(event) {
    console.log('parent: ', event);
    this.subTitle = event;
  }
}
