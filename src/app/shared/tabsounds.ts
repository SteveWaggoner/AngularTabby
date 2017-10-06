//
// Howler.js
//
import {Tuning} from "./tabmusic";

declare var Howl: any;


export class Octave {

  public src: string[];
  private sound: any;
  private isLoaded = false;

  public noteName: string;

  constructor(public octave: number, public note: string, toSource: (octave: number, note: string) => string[]) {
    this.noteName = note + octave;

    this.src = toSource(octave, note);

    this.sound = new Howl({
      src: this.src,
      preload: false
    });

    console.log(this.noteName + ' == ' + this.src);

  }

  public play(): number {
    if ( ! this.isLoaded ) {
      this.isLoaded = true;
      this.sound.load();
    }
    return this.sound.play();
  }

  public volume(vol: number, playid: number) {
    this.sound.volume(vol, playid);
  }

}

export class Octaves {

  private octavesMap = new Map<string, Octave>();
  private octavesArr: Octave[] = [];
  private notes: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  constructor(toSource: (octave: number, note: string) => string[]) {
    this.initializeOctaves(toSource);
  }

  private initializeOctaves(toSource: (octave: number, note: string) => string[]) {
    for (let i = 1; i <= 4; i++) {
      this.notes.forEach((note: string, index: number) => {
        const octave = new Octave(i, note, toSource);
        this.octavesMap[octave.noteName] = octave;
        this.octavesArr.push(octave);
      });
    }
  }

  find(noteName: string): Octave {
    return this.octavesMap[noteName];
  }


  get (index: number): Octave {
    return this.octavesArr[index];
  }
}

export class AudioChannel {
  public sound: any; // AudioInstance
  public playid: number; // last Howl play id
  public finished = -1;  // expected end time for this channel
}

export class GuitarString {
  constructor(public openString: string, public octaveNoteIndex: number) {
  }
}


export abstract class Instrument {

  private channel_max = 100;
  private audiochannels: AudioChannel[] = [];

  constructor(public readonly name: string) {
    this.initializeAudioChannels();
  }

  abstract getOctaves(): Octaves;

  private initializeAudioChannels() {
    for (let a = 0; a < this.channel_max; a++) {									// prepare the channels
      this.audiochannels.push(new AudioChannel());
    }
  }


  public getNote(tuning: Tuning, stringIndex: number, fretValue: number): string {

    const gstring = tuning.guitarStrings[stringIndex];
    if (gstring) {
      const octave = this.getOctaves().get(gstring.octaveNoteIndex + fretValue);
      if (octave) {
        return octave.noteName;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  public isBadNote(tuning: Tuning, stringIndex: number, fretValue: number): boolean {
    const gstring = tuning.guitarStrings[stringIndex];
    if (gstring) {
      const octave = this.getOctaves().get(gstring.octaveNoteIndex + fretValue);
      if (octave && octave.src.length > 0) {
        return false;
      }
    }
    return true;
  }

  public playSound(tuning: Tuning, stringIndex: number, fretValue: number) {

    const gstring = tuning.guitarStrings[stringIndex];
    const noteName = this.getNote(tuning, stringIndex, fretValue);
    const octave = this.getOctaves().find(noteName);

    if ( this.isBadNote(tuning, stringIndex, fretValue) ) {
      console.log("skipping playing bad note!");
      return;
    }

    let found = 0;
    for (let a = 0; a < this.audiochannels.length; a++) {
      const this_time = new Date();
      const cur_time = this_time.getTime();
      const chnl_time = this.audiochannels[a].finished;

      if (chnl_time < cur_time) {			// is this channel finished?
        if (octave) {
          this.audiochannels[a].sound = octave;
          this.audiochannels[a].playid = octave.play();

          const vol = [0.4, 0.5, 0.6, 0.7, 0.9, 1.0][stringIndex];
          this.audiochannels[a].sound.volume(vol, this.audiochannels[a].playid);

          const max_duration = 10; // longest possible note is 5secs

          this.audiochannels[a].finished = cur_time + max_duration * 1000;

          found = 1;
          break;
        }
      }
    }
    if (found === 0) {
      console.log('"failed to play note');
    }
  }
}


