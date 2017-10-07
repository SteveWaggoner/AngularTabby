import {Component} from '@angular/core';
import {PlayerService} from '../shared/player.service';

@Component(
  {
    selector: 'app-tabby-footer',
    template: `
    <p>NoteIndex: {{noteIndex}}</p>
    <p><small>{{ua}}</small></p>
    `
  }
)
export class TabbyFooterComponent {

  constructor(playerService: PlayerService) {
    playerService.music.noteIndex$.subscribe((noteIndex) => {
       this.noteIndex = noteIndex; });

    this.ua = navigator.userAgent;
  }

  public noteIndex = -1;

  public ua = '';
}
