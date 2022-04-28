import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from 'src/components/components.module';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, ComponentsModule],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
