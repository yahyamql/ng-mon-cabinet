import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotificationFormComponent } from './notification-form/notification-form.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent, NotificationFormComponent, DialogContentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports : [HeaderComponent, FooterComponent, SidebarComponent],
})
export class SharedModule { }
