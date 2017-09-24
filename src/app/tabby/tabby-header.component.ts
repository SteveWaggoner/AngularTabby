import {Component} from '@angular/core';
import {Song} from '../shared/song';

import {List} from 'immutable';
import {PlayerService} from '../shared/player.service';

@Component(
  {
    selector: 'app-tabby-header',
    template: `

    <img src="assets/img/tabby_cat.png" alt="image" width="75" height="75">

    <select class="form-control" name="song" [(ngModel)]="selectedSong" (change)="onSongChange($event)">
      <option *ngFor="let song of songs " [ngValue]="song">{{song.title}}</option>
    </select>
    `
  }
)
export class TabbyHeaderComponent {

  selectedSong: Song = null;
  songs: List<Song>;


  constructor(public playerService: PlayerService) {
    // on external changes..update user interface
    playerService.music.song$.subscribe((value: Song) => {
      this.selectedSong = value;
    });

    playerService.songDb.songs$.subscribe((value: List<Song>) => {
      this.songs = value;
    });
  }

  onSongChange(event: Event): void {

    // on user interface changes..update the service
    this.playerService.setSelectedSong(this.selectedSong);
  }
}
