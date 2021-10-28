import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Game } from 'src/app/models/api.model';
import { HttpService } from 'src/app/services/http.service';

@Injectable({ providedIn: 'root' })
export class HomeResolverService implements Resolve<Game[]> {
  constructor(private httpSvc: HttpService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.httpSvc.games?.length) return of(this.httpSvc.games);
    else {
      return this.httpSvc.getGameListAndReturn();
    }
  }
}
