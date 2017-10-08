import {GuitarString, Instrument, Tuning} from './tabsounds';
import {Song} from './song';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {TabParser} from './tabparser';


export class Speed {
  constructor(public readonly name: string, public readonly barTime: number) {
  }
}

export class TabMusic {

  public readonly song$ = new BehaviorSubject<Song>(null);
  public readonly instrument$ = new BehaviorSubject<Instrument>(null);
  public readonly tuning$ = new BehaviorSubject<Tuning>(null);
  public readonly speed$ = new BehaviorSubject<Speed>(null);
  public readonly isPlaying$ = new BehaviorSubject<boolean>(false);
  public readonly isPaused$ = new BehaviorSubject<boolean>(false);
  public readonly noteIndex$ = new BehaviorSubject<number>(-1);

  private interval = undefined;

  private firstLine = '';
  private step = 0;
  private stepCount = 0;
  private steps;

  constructor() {
    const me = this;
    this.song$.subscribe((song) => {
      if (song) {
        me.loadSong(song);
      }
    });

    this.tuning$.next(this.tunings[0]);
    this.speed$.next(this.speeds[0]);
  }

  public readonly tunings = [

    new Tuning('Tuning EADGBE (Guitar)', [
      new GuitarString('e', 3),
      new GuitarString('B', 2),
      new GuitarString('G', 2),
      new GuitarString('D', 2),
      new GuitarString('A', 1),
      new GuitarString('E', 1)
    ]),

    new Tuning('Tuning GCEA (Ukulele high-G)', [
      new GuitarString('A', 1),
      new GuitarString('E', 1),
      new GuitarString('C', 1),
      new GuitarString('g', 1),
    ]),

    new Tuning('Tuning GCEA (Ukulele low-G)', [
      new GuitarString('A', 1),
      new GuitarString('E', 1),
      new GuitarString('C', 1),
      new GuitarString('g', 0),
    ]),

    new Tuning('Tuning DGBE (Baritone Ukulele)', [
      new GuitarString('e', 2),
      new GuitarString('B', 1),
      new GuitarString('G', 1),
      new GuitarString('D', 1),
    ]),

  ];

  public readonly speeds = [new Speed('Speed Auto', -1),
    new Speed('Speed 300 - fast', 300),
    new Speed('Speed 600', 600),
    new Speed('Speed 900', 900),
    new Speed('Speed 1500', 1500),
    new Speed('Speed 2000 - Normal', 2000),
    new Speed('Speed 3000', 3000),
    new Speed('Speed 5000', 5000),
    new Speed('Speed 7000', 7000),
    new Speed('Speed 9000 - Slow', 9000)];


  getBarTime(): number {
    const speed = this.speed$.getValue();

    console.log("getBarTime() speed = " + speed);
    if(speed) {
      console.log("getBarTime() speed.barTime = " + speed.barTime);
    }

    if (speed && speed.barTime > 0) {
      return speed.barTime;
    } else {
      return this.song$.getValue().bartime;
    }
  }

  loadSong(song: Song) {

    if (!song) {
      console.log('no song to load!?!?');
      return;
    }

    // init song
    const lines = TabParser.parseTabulature(song.tabulature);
    this.steps = TabParser.generateStepTable(lines);

    // calculate total steps
    this.firstLine = '';
    lines.forEach((line, n) => {
      if (line.stringIndex === 1) {
        line.notes.forEach((note, ni) => {
          this.firstLine += note.text;
        });
      }
    });
    this.stepCount = this.firstLine.length;

    // switch tuning to match song
    const tuningName = TabParser.parseTuning(song.tabulature);
    console.log('tuningName for ' + song.title + ' is ' + tuningName);
    if ( tuningName.length > 0 ) {

      this.tunings.forEach((tuning, n) => {

        // if not already matching tuning and this is matching then switch
        const currentTuningName = this.tuning$.getValue().name;
        if ( currentTuningName.indexOf(tuningName) === -1 && tuning.name.indexOf(tuningName) >= 0) {
          console.log('switch to ' + tuning.name);
          this.tuning$.next(tuning);
        }
      });
    }

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

      if (!this.isPaused$.getValue()) {

        // adjust speed if necessary
        this.checkStep();

        // play next step (if is a note)
        this.step += this.playStep();

        // stop if at end
        if (this.step >= this.stepCount) {
          this.stop();
        }
      }
    }, this.getBarTime() / newBarLength);
  }

  checkStep() {

    // speed past whitespace
    while (this.step >= 0 && this.step < this.stepCount && this.firstLine[this.step] === ' ') {
      console.log('Step ' + this.step + ' skip ws');
      this.step++;
    }

    const fretValue = this.firstLine[this.step];
    if (fretValue === '|' || ('EADGBe'.indexOf(fretValue) >= 0)) {

      const sub = this.firstLine.substring(this.step + 3);
      const barLength = sub.indexOf('|');
      if (barLength > 0) {
        this.step += this.playStep();

        console.log('step ' + this.step + ' adjusting barLenth=' + barLength + '  fretValue=' + fretValue);
        this.configureInterval(barLength);
      } else {
        console.log('step ' + this.step + ' leading chars: ' + sub);
      }
    }
  }


  playStep() {
    let stepCharLength = 1;

    if (this.steps !== undefined && this.steps.has(this.step)) {
      const stepNotes = this.steps.get(this.step);

      console.log('step ' + this.step + ' is several notes');

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
          instrument.playSound(noteName, vol);

          console.log('  noteIndex=' + this.noteIndex$.getValue() + '  ' + note.text);
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
