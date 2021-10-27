import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/api.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
})
export class GameDetailsComponent implements OnInit, OnDestroy {
  gameRating: number = 0;
  gameId: string = '';
  game!: Game;
  routeSub!: Subscription;
  gameSub!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private HttpSvc: HttpService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }

  getColor(value: number): string {
    if (value > 75) return '#5ee432';
    if (value < 75 && value > 50) return '#fffa50';
    if (value < 50 && value > 30) return '#f7aa3d';
    return '#ef4655';
  }

  private getGameDetails(id: string): void {
    this.gameSub = this.HttpSvc.getGameDetails(id).subscribe((game: Game) => {
      this.game = game;
      setTimeout(() => {
        this.gameRating = this.game.metacritic;
      }, 1000);
    });
  }

  ngOnDestroy() {
    if (this.routeSub) this.routeSub.unsubscribe();
    if (this.gameSub) this.gameSub.unsubscribe();
  }
}
