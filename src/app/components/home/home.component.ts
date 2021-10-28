import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';
import { APIResponse, Game } from 'src/app/models/api.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  public sort: string = '';
  searchValue?: string;
  games: Array<Game> = [];
  called = false;
  isShowSkeleton: boolean = true;
  private routeSub!: Subscription;
  private gameSub!: Subscription;
  private sortValue: string = '';
  private timeout: any = null;
  @ViewChild('scroller', { static: true }) scroller!: CdkVirtualScrollViewport;

  constructor(
    private httpSvc: HttpService,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.games = this.route.snapshot.data.games;
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchValue = params['game-search'];
        this.searchGames('metacrit', '1', params['game-search']);
      }
    });

    this.gameSub = this.httpSvc.gameChanged.subscribe(
      (gamelist: Array<Game>) => {
        this.games = gamelist;
      }
    );

    this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')), //scroll offset from bottom of the list
        pairwise(), //get off set in pairs >> 可以知道往上或往下
        filter(([y1, y2]) => y2 < y1 && y2 < 140), // y2 < y1 為往下
        throttleTime(200) // 200毫秒內不拿到repeast call
      )
      .subscribe(() => {
        this.zone.run(() => {
          this.getNextPageHandler();
        });
      });
  }

  ngAfterViewInit() {
    this.timeout = setTimeout(() => {
      this.isShowSkeleton = false;
    }, 2000);
  }

  searchGames(sort: string, page: string, search?: string) {
    this.sortValue = sort;
    this.httpSvc.getGameList(sort, page, search);
  }

  getNextPageHandler() {
    this.httpSvc.getGameList(
      this.sortValue || 'metacrit',
      this.httpSvc.nextPageParams,
      this.searchValue
    );
  }

  ngOnDestroy() {
    if (this.routeSub) this.routeSub.unsubscribe();
    if (this.gameSub) this.gameSub.unsubscribe();
    if (this.timeout) clearTimeout(this.timeout);
  }
}
