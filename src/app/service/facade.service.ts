import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  toggleSideBar = new Subject<boolean>();

  constructor() { }
}
