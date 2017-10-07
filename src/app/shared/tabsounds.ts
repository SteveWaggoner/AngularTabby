
// Howler.js
declare const Howl: any;

class MusicalNote {

  private sound: any;
  private isLoaded = false;

  constructor(public noteName: string, srcs: string[]) {

    this.sound = new Howl({
      src: srcs,
      preload: false
    });

    console.log(this.noteName + ' == ' + srcs);
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


export class MusicalNotes {

  private notes: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  private noteMap = new Map<string, MusicalNote>();

  constructor(toSource: (octave: number, note: string) => string[]) {
    this.initializeNotes(toSource);
  }

  private initializeNotes(toSource: (octave: number, note: string) => string[]) {

    for (let octave = 0; octave <= 4; octave++) {

      this.notes.forEach((note: string) => {

        const noteName = note + octave;
        const srcs = toSource(octave, note);

        console.log('Loading notes ' + noteName + ' == ' + srcs.length);

        if ( srcs.length > 0) {
          this.noteMap.set(noteName, new MusicalNote(noteName, srcs));
        }
      });
    }
  }

  private getFretNoteName(octave: number, note: string, fretValue: number): string {
    const noteIndex = this.notes.indexOf(note.toUpperCase());
    if ( noteIndex > -1 && fretValue >= 0 && octave >= 0) {
      const noteIndex2 = noteIndex + fretValue;
      const octaveOffset = Math.floor(noteIndex2 / 12);
      const noteOffset = noteIndex2 % 12;
      return this.notes[noteOffset] + (octave + octaveOffset);
    }
    return '';
  }


  public getNoteName(tuning: Tuning, stringIndex: number, fretValue: number): string {

    const gstring = tuning.guitarStrings[stringIndex];
    if (gstring) {
      return this.getFretNoteName(gstring.octave, gstring.openNote, fretValue);
    } else {
      return '';
    }
  }

  public getNote(noteName: string): MusicalNote {
    return this.noteMap.get(noteName);
  }
}


export class AudioChannel {
  public sound: MusicalNote;
  public playid: number; // last Howl play id
  public finished = -1;  // expected end time for this channel
}

export class GuitarString {
  constructor(public readonly openNote: string, public readonly octave: number) {
  }
}

export class Tuning {
  constructor(public readonly name: string, public readonly guitarStrings: GuitarString[]) {
  }
}

export abstract class Instrument {

  private channel_max = 100;
  private audiochannels: AudioChannel[] = [];

  constructor(public readonly name: string) {
    this.initializeAudioChannels();
  }

  abstract getMusicalNotes(): MusicalNotes;

  private initializeAudioChannels() {
    for (let a = 0; a < this.channel_max; a++) {									// prepare the channels
      this.audiochannels.push(new AudioChannel());
    }
  }

  public playSound(noteName: string, volume: number) {

    const note = this.getMusicalNotes().getNote(noteName);

    if ( ! note ) {
      console.log('Missing note ' + noteName + ' in instrument ' + this.name);
      return;
    }

    let found = 0;
    for (let a = 0; a < this.audiochannels.length; a++) {
      const this_time = new Date();
      const cur_time = this_time.getTime();
      const chnl_time = this.audiochannels[a].finished;

      if (chnl_time < cur_time) {			// is this channel finished?
        this.audiochannels[a].sound = note;
        this.audiochannels[a].playid = note.play();


        this.audiochannels[a].sound.volume(volume, this.audiochannels[a].playid);

        const max_duration = 10; // longest possible note is 5secs

        this.audiochannels[a].finished = cur_time + max_duration * 1000;

        found = 1;
        break;
      }
    }
    if (found === 0) {
      console.log('failed to play note');
    }
  }
}
