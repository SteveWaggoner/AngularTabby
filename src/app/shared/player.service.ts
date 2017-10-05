import {Injectable} from '@angular/core';

import {SongDb} from './song.db';
import {Song} from './song';
import {Speed, TabMusic, Tuning} from './tabmusic';
import {InstrumentDb} from './instrument.db';
import {Instrument} from './tabsounds';


@Injectable()
export class PlayerService {

  public readonly songDb = new SongDb();
  public readonly instrumentDb = new InstrumentDb();
  public readonly music = new TabMusic();

  constructor() {
    this.setSelectedSong(this.songDb.firstSong());
    this.setSelectedInstrument(this.instrumentDb.firstInstrument());
  }

  public setSelectedSong(song: Song) {
    this.music.song$.next(song);
  }

  public setSelectedInstrument(instrument: Instrument) {
    this.music.instrument$.next(instrument);
  }

  public setSelectedTuning(tuning: Tuning) {
    this.music.tuning$.next(tuning);
  }

  public setSelectedSpeed(speed: Speed) {
    this.music.speed$.next(speed);
  }
}
