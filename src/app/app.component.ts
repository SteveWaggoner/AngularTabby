import {Component} from '@angular/core';

import {Song} from './shared/song';
import {PlayerService} from './shared/player.service';


@Component({
  selector: 'app-root',
  template: `
    <section class="tabbyapp">
      <app-tabby-header></app-tabby-header>
      <app-tabby-music></app-tabby-music>
      <app-tabby-footer (onClick)="blahblah()"></app-tabby-footer>
    </section>
  `,
  providers: [PlayerService]
})
export class AppComponent {


  constructor(private playerService: PlayerService) {
  }


  public blahblah() {

    this.playerService.songDb.addSong( new Song('foo', 333, 'bar'));


  }

}

