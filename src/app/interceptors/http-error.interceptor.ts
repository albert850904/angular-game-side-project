import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoaderSpinnerService } from '../services/loader-spinner.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private loaderSvc: LoaderSpinnerService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((req) => {
        if (req instanceof HttpResponse && req.body) {
          this.loaderSvc.hide();
        }
      }),
      catchError((error) => {
        console.log('http error interceptor ', error);
        return throwError(error);
      })
    );
  }
}
