import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SwitchModule } from '../switch/switch.module';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [CommonModule, SwitchModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
