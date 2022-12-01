import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InfoBarComponent } from './info-bar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [InfoBarComponent],
  exports: [InfoBarComponent],
})
export class InfoBarModule {}
