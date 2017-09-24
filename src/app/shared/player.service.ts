import {Injectable} from '@angular/core';

import {SongDb} from './song.db';
import {Song} from './song';
import {TabMusic} from './tabmusic';


@Injectable()
export class PlayerService {

  public readonly songDb = new SongDb();
  public readonly music = new TabMusic();

  constructor() {
    this.setSelectedSong(this.songDb.firstSong());
  }

  public setSelectedSong(song: Song) {
    this.music.song$.next(song);
  }

}
