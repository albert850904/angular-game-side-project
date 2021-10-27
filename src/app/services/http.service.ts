import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models/api.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public gameChanged = new Subject<Game[]>();
  public games: Array<Game> = [];
  nextPageParams: string = '';
  constructor(private http: HttpClient) {}

  getGameList(ordering: string, page: string, search?: string) {
    let params = new HttpParams()
      .set('ordering', ordering)
      .set('page_size', 15)
      .set('page', page);
    if (search) {
      params = new HttpParams()
        .set('ordering', ordering)
        .set('search', search)
        .set('page_size', 15)
        .set('page', page);
    }
    console.log('params', params);
    this.http
      .get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
        params,
      })
      .subscribe((list: APIResponse<Game>) => {
        const newGameList = this.games.slice();
        if (list.previous) {
          this.games = newGameList.concat(list.results);
        } else {
          this.games = list.results;
        }
        this.gameChanged.next(this.games.slice());
        const urlObj = new URL(list.next);
        const page = new URLSearchParams(urlObj.search);
        this.nextPageParams = page.get('page') || '1';
      });
  }

  // getNextGamePage(url: string) {
  //   this.http
  //     .get<APIResponse<Game>>(`${env.BASE_URL}/games`)
  //     .subscribe((list: APIResponse<Game>) => {
  //       const newGameList = this.games.slice();
  //       this.games = newGameList.concat(list.results);
  //       this.gameChanged.next(this.games.slice());
  //       const urlObj = new URL(list.next);
  //       const page = new URLSearchParams(urlObj.search);
  //       this.nextPageParams = page.get('page') || '1';
  //     });
  // }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoReq = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersReq = this.http.get(`${env.BASE_URL}/games/${id}/movies`);
    const gameScreenshotreq = this.http.get(
      `${env.BASE_URL}/games/${id}/screenshots`
    );

    return forkJoin(gameInfoReq, gameTrailersReq, gameScreenshotreq).pipe(
      map((res: any) => {
        return {
          ...res[0],
          trailers: res[1]?.results,
          screenshots: res[2]?.results,
        };
      })
    );
  }
}
