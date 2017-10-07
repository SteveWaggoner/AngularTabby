import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {List} from 'immutable';
import {Instrument, MusicalNotes} from './tabsounds';

export class InstrumentDb {

  constructor() {
    this.loadInitialData();
  }

  private _instruments: BehaviorSubject<List<Instrument>> = new BehaviorSubject(List([]));
  public readonly instruments$: Observable<List<Instrument>> = this._instruments.asObservable();

  public addInstrument(instrument: Instrument) {
    this._instruments.next(this._instruments.getValue().push(instrument));
  }

  public firstInstrument(): Instrument {
    return this._instruments.getValue().first();
  }

  private loadInitialData() {
    this.addInstrument(new Guitar());
    this.addInstrument(new Ukulele());
  }

}


export class Ukulele extends Instrument {

  constructor() {
    super('Ukulele');
  }
  private musicalNotes = new MusicalNotes(Ukulele.toSource);

  private static toSource(octave: number, note: string): string[] {
    const noteName = octave + note;

    const lu = {
      '0G':  'uke_low_g',
      '0G#': 'uke_low_gsharp',
      '0A':  'uke_low_a',
      '0A#': 'uke_low_asharp',
      '0B':  'uke_low_b',
   // '1C':  'SUkeS2_F0_C',
      '1C':  'uke_s2_f0_c4',
      '1C#': 'SUkeS2_F1_C',
      '1D':  'SUkeS2_F2_C',
      '1D#': 'SUkeS2_F3_C',
   // '1E':  'SUkeS3_F0_E',
      '1E':  'uke_s3_f0_e4',
      '1F':  'SUkeS3_F1_E',
      '1F#': 'SUkeS3_F2_E',
      '1G':  'SUkeS1_F0_G',
      '1G#': 'SUkeS1_F1_G',
   // '1A':  'SUkeS4_F0_A',
      '1A':  'uke_s4_f0_a4',
      '1A#': 'SUkeS4_F1_A',
      '1B':  'SUkeS4_F2_A',
      '2C':  'SUkeS4_F3_A',
      '2C#': 'SUkeS4_F4_A',
      '2D':  'SUkeS4_F5_A',
      '2D#': 'SUkeS4_F6_A',
      '2E':  'SUkeS4_F7_A',
      '2F':  'SUkeS4_F8_A',
      '2F#': 'uke_s4_f9',
      '2G':  'uke_s4_f10',
      '2G#': 'uke_s4_f11',
      '2A':  'uke_s4_f12',
    };

    const baseName = lu[noteName];
    if ( baseName !== undefined ) {
      console.log(noteName + ' => ' + baseName);
      return ['assets/sounds/ukulele/' + baseName + '.webm', 'assets/sounds/ukulele/' + baseName + '.mp3'];
    } else {
      return [];
    }
  }

  public getMusicalNotes(): MusicalNotes {
    return this.musicalNotes;
  }
}


export class Guitar extends Instrument {

  private musicalNotes = new MusicalNotes(Guitar.toSource);

  constructor() {
    super('Guitar');
  }

  private static toSource(octave: number, note: string): string[] {

    if ( octave < 1 || octave > 4 ) { return []; }
    if ( octave === 1 && note.startsWith('C')) { return []; } // These are missing??

    const safe_noteName = octave + note.replace('#', 'sharp');
    return ['assets/sounds/guitar/' + safe_noteName + '.webm', 'assets/sounds/guitar/' + safe_noteName + '.mp3'];
  }

  public getMusicalNotes(): MusicalNotes {
    return this.musicalNotes;
  }
}

