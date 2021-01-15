import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  toggleSideBar = new Subject<boolean>();

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}
