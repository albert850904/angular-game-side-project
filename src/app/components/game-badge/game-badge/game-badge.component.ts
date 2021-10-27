import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/api.model';

@Component({
  selector: 'app-game-badge',
  templateUrl: './game-badge.component.html',
  styleUrls: ['./game-badge.component.scss'],
})
export class GameBadgeComponent implements OnInit {
  @Input() games!: Array<Game>;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  openGameDetails(id: number): void {
    this.router.navigate(['details', id]);
  }
}
