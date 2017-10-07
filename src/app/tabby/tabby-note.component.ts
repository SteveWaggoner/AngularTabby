import {Component, Input, OnInit} from '@angular/core';
import {Note} from '../shared/note';
import {PlayerService} from '../shared/player.service';
import {Instrument, Tuning} from '../shared/tabsounds';

@Component(
  {
    selector: 'app-tabby-note',

    styles: [`
      span.note {
      }

      span.note.tooltip:hover {
        color: blue;
      }

      span.played {
      }

      span.played::before {
        content: '   ';
        z-index: -1;
        background-image: url('assets/img/note-bkg.png');
        background-repeat: no-repeat;
      }

      span.played.bad::before {
        background-image: url('assets/img/note-bkg-gray.png');
      }

      span.played.onedigit::before {
        margin: 0 -17px 0 -16.5px; /* perfect for chrome */
        background-position-x: 8px;
        padding: 4px 6px 6px 6px;
      }

      /*This will work for firefox */
      span.played.onedigit.firefox::before {
        margin: 0 -17px 0 -18px;
      }

      /*This will work for IE */
      span.played.onedigit.ie::before {
        margin: 0 -17px 0 -21px;
      }

      /*This will work for Chrome on iPad */
      span.played.onedigit.chrome_ios::before {
        margin: 0 -17px 0 -18.4px; 
      }

      /*This will work for Chrome on android phone */
      span.played.onedigit.chrome_android::before {
        margin: 0 -17px 0 -18.4px; 
      }

      /*This will work for Safari on iPad */
      span.played.onedigit.safari_ipad::before {
        margin: 0 -17px 0 -18.4px; 
      }

      span.played.twodigit::before {
        margin: 0 -18px 0 -15.5px;
        background-position-x: 11px;
        padding: 4px 6px 6px 6px;
      }

      /* Tooltip container */
      .tooltip {
        position: relative;
        display: inline-block;
        cursor: pointer;
      }

      .tooltip:hover {
      }

      .tooltip .tooltiptext {
        visibility: hidden;
        width: 30px;
        background-color: darkblue;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        bottom: 150%;
        left: 50%;
        margin-left: -15px;
      }

      .tooltip .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: black transparent transparent transparent;
      }

      .tooltip:hover .tooltiptext {
        visibility: visible;
      }
    `]
    ,
    template: `<span [ngClass]="setClasses()" (click)="playNote($event)">{{note.text}}<span class="tooltiptext">{{noteName}}</span></span>`
  }
)
export class TabbyNoteComponent implements OnInit {

  @Input() note: Note;

  noteName = '';
  badNote = false;

  currentNoteIndex = -1;
  currentTuning: Tuning = null;
  currentInstrument: Instrument = null;

  constructor(private playerService: PlayerService) {
  }

  ngOnInit() {
    this.playerService.music.noteIndex$.subscribe((noteIndex) => {
      this.currentNoteIndex = noteIndex;
    });

    this.playerService.music.tuning$.subscribe((tuning) => {
      this.currentTuning = tuning;
      this.updateLabel();
    });

    this.playerService.music.instrument$.subscribe((instrument) => {
      this.currentInstrument = instrument;
      this.updateLabel();
    });
  }

  private updateLabel() {
    if (this.currentInstrument && this.currentTuning && this.note && this.note.stringIndex >= 0 && this.note.fretValue !== undefined) {
      this.noteName = this.currentInstrument.getMusicalNotes().getNoteName(this.currentTuning, this.note.stringIndex, this.note.fretValue);
      this.badNote = this.currentInstrument.getMusicalNotes().getNote(this.noteName) === undefined;

      console.log("component = " + this.noteName);
    }
  }

  playNote(event: any) {
    this.currentInstrument.playSound(this.noteName, 1);
  }

  setClasses() {
    const classes = {
      'tooltip': this.note.fretValue >= 0,
      'note': this.note.fretValue >= 0,
      'played': this.note.fretValue >= 0 && this.note.index <= this.currentNoteIndex,
      'bad': this.badNote,
      'onedigit': this.note.digits === 1,
      'twodigit': this.note.digits === 2,
      'firefox': navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
      'ie': !!navigator.userAgent.match(/Trident\/7\./),
      'chrome_ios': navigator.userAgent.indexOf('CriOS') > -1,
      'chrome_android': navigator.userAgent.indexOf('Android') > -1 && navigator.userAgent.indexOf('Chrome') > -1, 
      'safari_ipad': navigator.userAgent.indexOf('iPad') > -1 && navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('CriOS') == -1
    };
    return classes;
  }

}

