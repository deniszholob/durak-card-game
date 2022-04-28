import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dcg-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  @Input()
  public version?: string;
}
