import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models/api.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams()
      .set('ordering', ordering)
      .set('page_size', 15);
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params,
    });
  }

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
