//
// Howler.js
//
declare var Howl: any;

export class Octave {

  public src: string;
  public noteName: string;
  private sound: any;
  private isLoaded = false;

  constructor(public octave: number, public note: string, public dir: string) {
    this.noteName = octave + note.replace('#', 'sharp');
    this.src = dir + '/' + this.noteName + '.ogg';

    this.sound = new Howl({
      src: [this.src],
      preload: false
    });

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

  constructor(dir: string) {
    this.initializeOctaves(dir);
  }

  initializeOctaves(dir: string) {
    for (let i = 1; i <= 4; i++) {
      this.notes.forEach((note: string, index: number) => {
        const octave = new Octave(i, note, dir);
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

  public currentNoteIndex = 0;

  constructor(public openString: string, public octaveNoteIndex: number) {
  }

}

export interface Instrument {
  getOpenString(stringIndex: number): string;
  getNote(stringIndex: number, fretValue: number): string;
  playSound(stringIndex: number, fretValue: number, volume: number);
}

export class Guitar implements Instrument {

  private octaves = new Octaves('assets/sounds/piano');

  private guitarStrings = [
    new GuitarString('e', 28),
    new GuitarString('B', 23),
    new GuitarString('G', 19),
    new GuitarString('D', 14),
    new GuitarString('A', 9),
    new GuitarString('E', 4)
  ];

  channel_max = 200;
  private audiochannels: AudioChannel[] = [];


  private initializeAudioChannels() {
    for (let a = 0; a < this.channel_max; a++) {									// prepare the channels
      this.audiochannels.push(new AudioChannel());
    }
  }

  constructor() {
    this.initializeAudioChannels();
  }

  public getOpenString(stringIndex: number): string {
    return this.guitarStrings[stringIndex].openString;
  }

  public getNote(stringIndex: number, fretValue: number): string {
    return this.octaves.get(this.guitarStrings[stringIndex].octaveNoteIndex + fretValue).noteName;
  }


  public playSound(stringIndex: number, fretValue: number, volume: number) {

    const noteName = this.getNote(stringIndex, fretValue);
    const octave = this.octaves.find(noteName);

    /*
    for (let a = 0; a < this.audiochannels.length; a++) {
      if ( this.audiochannels[a].channel ) {
        const cur_volume = this.audiochannels[a].channel.volume;
        this.audiochannels[a].channel.volume = (cur_volume - .2) > 1 ? cur_volume - .2 : cur_volume;  // WHY???
      }
    }
    */

    let found = 0;
    for (let a = 0; a < this.audiochannels.length; a++) {
      const this_time = new Date();
      const cur_time = this_time.getTime();
      const chnl_time = this.audiochannels[a].finished;

      if (chnl_time < cur_time) {			// is this channel finished?
        if (octave) {
          this.audiochannels[a].sound = octave;
          this.audiochannels[a].playid = octave.play()

          const vol = [0.4, 0.5, 0.6, 0.7, 0.9, 1.0][stringIndex];
          this.audiochannels[a].sound.volume(vol, this.audiochannels[a].playid)

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
