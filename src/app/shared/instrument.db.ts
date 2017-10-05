import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {List} from 'immutable';
import {BaseInstrument, GuitarString, Instrument, Octaves} from "./tabsounds";

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


export class Ukulele extends BaseInstrument implements Instrument {

  private octaves = new Octaves(this.toSource);

  private guitarStrings = [
    new GuitarString('A', 9),
    new GuitarString('E', 4),
    new GuitarString('C', 0),
    new GuitarString('g', 7),
  ];

  toSource(octave: number, note: string): string[] {
    const noteName = octave + note;

    const lu = {
      "1C":  "S2_F0_C",
      "1C#": "S2_F1_C",
      "1D":  "S2_F2_C",
      "1D#": "S2_F3_C",
      "1E":  "S3_F0_E",
      "1F":  "S3_F1_E",
      "1F#": "S3_F2_E",
      "1G":  "S1_F0_G",
      "1G#": "S1_F1_G",
      "1A":  "S4_F0_A",
      "1A#": "S4_F1_A",
      "1B":  "S4_F2_A",
      "2C":  "S4_F3_A",
      "2C#": "S4_F4_A",
      "2D":  "S4_F5_A",
      "2D#": "S4_F6_A",
      "2E":  "S4_F7_A",
      "2F":  "S4_F8_A",
    };

    const label = lu[noteName]

    console.log(noteName + ' => ' + label)

    return ['assets/sounds/ukulele/SUke' + label + '.webm', 'assets/sounds/ukulele/SUke' + label + '.mp3'];
  }


  public getName(): string {
    return "Ukulele";
  }

  public getOctaves(): Octaves {
    return this.octaves;
  }

  public getString(stringIndex:number): GuitarString {
    return this.guitarStrings[stringIndex];
  }
}


export class Guitar extends BaseInstrument implements Instrument {

  toSource(octave: number, note: string): string[] {
    const safe_noteName = octave + note.replace('#', 'sharp');
    return ['assets/sounds/guitar/' + safe_noteName + '.webm', 'assets/sounds/guitar/' + safe_noteName + '.mp3'];
  }
  private octaves = new Octaves(this.toSource);

  private guitarStrings = [
    new GuitarString('e', 28),
    new GuitarString('B', 23),
    new GuitarString('G', 19),
    new GuitarString('D', 14),
    new GuitarString('A', 9),
    new GuitarString('E', 4)
  ];

  public getName(): string {
    return "Guitar";
  }

  public getOctaves(): Octaves {
    return this.octaves;
  }

  public getString(stringIndex:number): GuitarString {
    return this.guitarStrings[stringIndex];
  }
}

