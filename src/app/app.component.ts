import { Component } from '@angular/core';

import packageJson from '@dcg/package';

@Component({
  selector: 'dcg-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public appVersion: string | undefined = packageJson?.version;
}
