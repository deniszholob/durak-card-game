import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dcg-card-badge',
  templateUrl: './card-badge.component.html',
})
export class CardBadgeComponent {
  @Input()
  public cardCount = 0;
}
