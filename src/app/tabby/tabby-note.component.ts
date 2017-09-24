import {Component, Input } from '@angular/core';
import {Note} from '../shared/note';
import {PlayerService} from '../shared/player.service';

@Component(
  {
    selector: 'app-tabby-note',

    styles: [`

      span.note {
      }

      span.played {
      }

      span.played::before {
        content: '   ';
        z-index: -1;
        background-image: url('assets/img/note-bkg.png');
        background-repeat: no-repeat;
      }

      span.played.onedigit::before {
        margin: 0 -17px 0 -16px;
        background-position-x: 8px;
        padding: 4px 6px 6px 6px;
      }

      span.played.twodigits::before {
        margin: 0 -18px 0 -15px;
        background-position-x: 11px;
        padding: 4px 6px 6px 6px;
      }
    `]
  ,
    template: `<span [attr.label]="label" [ngClass]="setClasses()">{{note.text}}</span>`}
)
export class TabbyNoteComponent  {

  @Input() note: Note;

  label = '??';

  currentNoteIndex = -1;

  constructor(playerService: PlayerService) {
    playerService.music.noteIndex$.subscribe((noteIndex) => { this.currentNoteIndex = noteIndex; } );
  }

  setClasses() {
    const classes =  {
      'note': this.note.fretValue >= 0,
      'played': this.note.fretValue >= 0 && this.note.index <= this.currentNoteIndex,
      'onedigit': this.note.digits === 1,
      'twodigit': this.note.digits === 2
    };
    return classes;
  }

}

