import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FacadeService } from './facade.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public facadeService: FacadeService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.facadeService.isLoading.next(true);
    return next.handle(req).pipe(
      finalize(
        ()=> {
          this.facadeService.isLoading.next(false);
        }
      )
    );

  }
}
