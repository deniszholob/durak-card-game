import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe(`GameService`, () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService],
    });
    service = TestBed.inject(GameService);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`should set turns correctly`, () => {
    expect(service.currentAttacker).toBe(0);
    expect(service.currentDefender).toBe(1);
    // service.setNextTurn();
    // expect(service.currentAttacker).toBe(1);
    // expect(service.currentDefender).toBe(0);
    // service.setNextTurn();
    // expect(service.currentAttacker).toBe(0);
    // expect(service.currentDefender).toBe(1);
  });
});
