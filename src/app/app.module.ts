import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';

import {TabbyHeaderComponent} from './tabby/tabby-header.component';
import {TabbyFooterComponent} from './tabby/tabby-footer.component';

import {TabbyNoteComponent} from './tabby/tabby-note.component';
import {TabbyLineComponent} from './tabby/tabby-line.component';
import {TabbyMusicComponent} from './tabby/tabby-music.component';


import {PlayerService} from './shared/player.service';

import { EscapeHtmlPipe } from './shared/keep-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TabbyHeaderComponent,
    TabbyFooterComponent,
    TabbyNoteComponent,
    TabbyLineComponent,
    TabbyMusicComponent,
    EscapeHtmlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
