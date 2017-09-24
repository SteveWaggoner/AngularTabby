import {Component} from '@angular/core';
import {PlayerService} from '../shared/player.service';

@Component(
  {
    selector: 'app-tabby-footer',
    template: `      
    <p>NoteIndex: {{noteIndex}}</p>
    `
  }
)
export class TabbyFooterComponent {

  constructor(playerService: PlayerService) {
    playerService.music.noteIndex$.subscribe((noteIndex) => {
       this.noteIndex = noteIndex; });
  }

  public noteIndex = -1;
}
