import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';

import {TabbyHeaderComponent} from './tabby/tabby-header.component';
import {TabbyBodyComponent} from './tabby/tabby-body.component';
import {TabbyFooterComponent} from './tabby/tabby-footer.component';

import {SongService} from './shared/song.service';

@NgModule({
  declarations: [
    AppComponent,
    TabbyHeaderComponent,
    TabbyBodyComponent,
    TabbyFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SongService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
