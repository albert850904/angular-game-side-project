import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBadgeComponent } from './game-badge.component';

describe('GameBadgeComponent', () => {
  let component: GameBadgeComponent;
  let fixture: ComponentFixture<GameBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
