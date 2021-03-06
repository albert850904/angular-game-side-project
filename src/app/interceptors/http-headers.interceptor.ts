import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderSpinnerService } from '../services/loader-spinner.service';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor(private loaderSvc: LoaderSpinnerService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      setHeaders: {
        'x-rapidapi-key': 'a01e2dcfadmshef3e9eee856233ap1a9376jsn1fce6cc82eaa',
        'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
      },
      setParams: {
        key: '2bc64b1124fc4ef5a6e5008f960207ab',
      },
    });
    this.loaderSvc.showSpinner();
    return next.handle(modifiedReq);
  }
}
