import {Guitar, Instrument} from './tabsounds';
import {Song} from './song';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {TabParser} from './tabparser';
import {Line} from './line';


export class TabMusic {

  public readonly song$ = new BehaviorSubject<Song>(null);

  public instrument$ = new BehaviorSubject<Instrument>(new Guitar());

  public isPlaying$ = new BehaviorSubject<boolean>(false);
  public isPaused$ = new BehaviorSubject<boolean>(false);

  public noteIndex$ = new BehaviorSubject<number>(-1);

  private interval = undefined;
  private volume = 1;
  private barTime = 3000; // speed of music
  private BAR_LENGTH = 18;   // how many steps in a bar?

  private lines: Line[];
  private firstLine = '';
  private steps;

  private step = 0;
  private stepCount = 0;

  private isPaused = false;

  constructor() {
    const me = this;
    this.song$.subscribe((song) => {
      if ( song ) {
        me.loadSong(song);
      }
    });

    this.isPaused$.subscribe((isPaused) => { this.isPaused = isPaused; });
  }

  loadSong(song: Song) {

    if ( ! song ) {
      console.log("no song to load!?!?");
      return;
    }

    // init song
    this.lines = TabParser.parseTabulature(song.tabulature);
    this.steps = TabParser.generateStepTable(this.lines);


    console.log("generateStepTable " + this.steps)

    // calculate total steps
    this.stepCount = 0;
    this.firstLine = '';
    this.lines.forEach((line, n) => {
      if (line.stringIndex === 1) {
        line.notes.forEach((note, ni) => {
          this.firstLine += note.text;
        });
      }
    });
    this.firstLine = this.firstLine.trim();
    this.stepCount = this.firstLine.length;
  }


  play() {
    this.isPlaying$.next(true);

    this.noteIndex$.next(-1);
    this.step = -1;
    this.configureInterval(this.BAR_LENGTH);
  }

  configureInterval(newBarLength: number) {

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {

      if (!this.isPaused) {

        // adjust speed if necessary
        this.checkStep();

        // play next step (if is a note)
        const stepCharLength = this.playStep();
        this.step += stepCharLength;

        console.log("step = " + this.step)

        // stop if at end
        if (this.step >= this.stepCount) {
          this.stop();
        }
      }
    }, this.barTime / newBarLength);
  }

  checkStep() {

    const fretValue = this.firstLine[this.step];
    if (fretValue === '|' || ('EADGBe'.indexOf(fretValue) >= 0)) {

      console.log("skipping leading chars")

      const sub = this.firstLine.substring(this.step + 3);
      const barLength = sub.indexOf('|');
      if (barLength > 0) {
        const stepCharLength = this.playStep();
        this.step += stepCharLength;

        this.configureInterval(barLength);
      }
    }
  }


  playStep() {
    let stepCharLength = 1;

    if ( this.steps !== undefined && this.steps.has(this.step)) {
      const stepNotes = this.steps.get(this.step);
      stepNotes.forEach((note, i) => {

        if (note.fretValue >= 0) {

          if (note.digits === 2) {
            stepCharLength = 2;
          }

          this.noteIndex$.next(this.noteIndex$.getValue() + 1);
          this.instrument$.getValue().playSound(note.stringIndex, note.fretValue, this.volume);

          this.volume = .5;

        }
      });
    } else {
      console.log('no step?');
    }

    return stepCharLength;
  }


  stop() {
    this.step = 0;
    this.noteIndex$.next(-1);
    clearInterval(this.interval);

    this.isPlaying$.next(false);
    this.isPaused$.next(false);
  }

  pause() {
    this.isPaused$.next(!this.isPaused$.value);
  }

}
