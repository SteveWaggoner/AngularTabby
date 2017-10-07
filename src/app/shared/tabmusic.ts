import {GuitarString, Instrument, Tuning} from './tabsounds';
import {Song} from './song';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {TabParser} from './tabparser';
import {Line} from './line';


export class Speed {
  constructor(public readonly name: string, public readonly barTime: number) {
  }
}


export class TabMusic {

  public readonly song$ = new BehaviorSubject<Song>(null);
  public instrument$ = new BehaviorSubject<Instrument>(null);
  public tuning$ = new BehaviorSubject<Tuning>(null);
  public speed$ = new BehaviorSubject<Speed>(null);

  public isPlaying$ = new BehaviorSubject<boolean>(false);
  public isPaused$ = new BehaviorSubject<boolean>(false);

  public noteIndex$ = new BehaviorSubject<number>(-1);

  private interval = undefined;

  private barTime = 3000; // speed of music
//  private BAR_LENGTH = 18;   // how many steps in a bar?

  private lines: Line[];
  private firstLine = '';
  private steps;

  private step = 0;
  private stepCount = 0;
  private tuningName = 'xx';

  private isPaused = false;

  constructor() {
    const me = this;
    this.song$.subscribe((song) => {
      if (song) {
        me.loadSong(song);
      }
    });

    this.isPaused$.subscribe((isPaused) => {
      this.isPaused = isPaused;
    });

    this.tuning$.next(this.tunings[0]);
    this.speed$.next(this.speeds[0]);
  }

  public readonly tunings = [

    new Tuning('tuning EADGBE (Guitar)', [
      new GuitarString('e', 3),
      new GuitarString('B', 2),
      new GuitarString('G', 2),
      new GuitarString('D', 2),
      new GuitarString('A', 1),
      new GuitarString('E', 1)
    ]),

    new Tuning('tuning GCEA (Ukulele high-G)', [
      new GuitarString('A', 1),
      new GuitarString('E', 1),
      new GuitarString('C', 1),
      new GuitarString('g', 1),
    ]),

    new Tuning('tuning GCEA (Ukulele low-G)', [
      new GuitarString('A', 1),
      new GuitarString('E', 1),
      new GuitarString('C', 1),
      new GuitarString('g', 0),
    ]),

    new Tuning('tuning DGBE (Baritone Ukulele)', [
      new GuitarString('e', 2),
      new GuitarString('B', 1),
      new GuitarString('G', 1),
      new GuitarString('D', 1),
    ]),

  ];

  public readonly speeds = [new Speed('speed auto', -1),
    new Speed('speed 300 - super fast', 300),
    new Speed('speed 600', 600),
    new Speed('speed 900', 900),
    new Speed('speed 1500', 1500),
    new Speed('speed 2000 - normal', 2000),
    new Speed('speed 3000', 3000),
    new Speed('speed 5000', 5000),
    new Speed('speed 7000', 7000),
    new Speed('speed 9000 - super slow', 9000)];


  getBarTime(): number {

    const speed = this.speed$.getValue()
    if (speed && speed.barTime > 0) {
      return speed.barTime;
    } else {
      return this.barTime;
    }
  }

  loadSong(song: Song) {

    if (!song) {
      console.log('no song to load!?!?');
      return;
    }

    // init song
    this.lines = TabParser.parseTabulature(song.tabulature);
    this.steps = TabParser.generateStepTable(this.lines);
    this.barTime = song.bartime;

    // switch tuning to match song
    this.tuningName = TabParser.parseTuning(song.tabulature);

    console.log('tuningName for ' + song.title + ' is ' + this.tuningName)

    if ( this.tuningName.length > 0 ) {
      this.tunings.forEach((tuning, n) => {

        if ( this.tuning$.getValue().name.indexOf(this.tuningName) === -1) {

          if (tuning.name.indexOf(this.tuningName) >= 0) {

            console.log('switch to ' + tuning.name);

            this.tuning$.next(tuning);
          }
        }

      });
    }


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

    this.stepCount = this.firstLine.length;
  }


  play() {
    this.isPlaying$.next(true);

    this.noteIndex$.next(-1);
    this.step = -1;
    this.configureInterval(1000); // start in 1sec
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

        // stop if at end
        if (this.step >= this.stepCount) {
          this.stop();
        }
      }
    }, this.getBarTime() / newBarLength);
  }

  checkStep() {

    // speed past whitespace
    while (this.step >= 0 && this.step < this.stepCount && this.firstLine[this.step] === " ") {
      console.log("Step " + this.step + " skip ws");
      this.step++;
    }

    const fretValue = this.firstLine[this.step];
    if (fretValue === '|' || ('EADGBe'.indexOf(fretValue) >= 0)) {

      const sub = this.firstLine.substring(this.step + 3);
      const barLength = sub.indexOf('|');
      if (barLength > 0) {
        const stepCharLength = this.playStep();
        this.step += stepCharLength;

        console.log("step " + this.step + " adjusting barLenth=" + barLength + "  fretValue=" + fretValue)
        this.configureInterval(barLength);
      } else {
        console.log("step " + this.step + " leading chars: " + sub)
      }
    }
  }


  playStep() {
    let stepCharLength = 1;

    if (this.steps !== undefined && this.steps.has(this.step)) {
      const stepNotes = this.steps.get(this.step);

      console.log('step ' + this.step + ' is several notes')

      stepNotes.forEach((note, i) => {

        if (note.fretValue >= 0) {

          if (note.digits === 2) {
            stepCharLength = 2;
          }

          this.noteIndex$.next(this.noteIndex$.getValue() + 1);

          const instrument = this.instrument$.getValue();
          const tuning = this.tuning$.getValue();

          const noteName = instrument.getMusicalNotes().getNoteName(tuning, note.stringIndex, note.fretValue);
          const vol = [0.4, 0.5, 0.6, 0.7, 0.9, 1.0][note.stringIndex];
          instrument.playSound(noteName, vol)

          console.log('  noteIndex=' + this.noteIndex$.getValue() + '  ' + note.text);

        } else {
          console.log('huh?');
        }
      });
    } else {
      console.log('step ' + this.step + ' not a note');
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
